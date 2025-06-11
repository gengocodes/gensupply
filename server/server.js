import express from "express"; //server side
import mysql from "mysql"; //database
import cors from "cors"; //access backend api using frontend
import cookieParser from "cookie-parser"; //cookies
import jwt from "jsonwebtoken"; //authentication(security)
import bcrypt from "bcrypt"; //hash pwds
import session from "express-session";
const PORT = 1234;
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
const crypt = 5;

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

app.post("/register", (req, res) => {
  const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), crypt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err)
        return res.json({
          Error: "Error in inserting the data to the server.",
        });
      return res.json({ Status: "Registration Success!" });
    });
  });
});
app.post("/updatename", (req, res) => {
  const username = req.body.username;
  const email = req.session.user?.email;

  if (!email) {
    return res.json({ Error: "Unauthorized or session expired" });
  }

  const sql = "UPDATE users SET name = ? WHERE email = ?";
  db.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error("Error updating name:", err);
      return res.json({ Error: "Failed to update username" });
    }
    const newUser = {
      id: req.session.user.id,
      name: username,
      email: req.session.user.email,
    };
    const newToken = jwt.sign(newUser, process.env.JWT_TOKEN, {
      expiresIn: "10m",
    });
    res.cookie("token", newToken);
    return res.json({ Status: "Username Updated!" });
  });
});
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Database not initialized!" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err)
            return res.json({
              Error:
                "Password does not match! Error in comparing the password.",
            });
          if (response) {
            const user = {
              id: data[0].id,
              name: data[0].name,
              email: data[0].email,
            };
            req.session.user = user;
            const token = jwt.sign(user, process.env.JWT_TOKEN, {
              expiresIn: "10m",
            });
            res.cookie("token", token);
            return res.json({ Status: "User Authenticated!" });
          } else {
            return res.json({ Error: "Wrong Password!" });
          }
        }
      );
    } else {
      return res.json({ Error: "Unregistered Email!" });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      Error: "You are not authenticated!",
    });
  } else {
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        return res.json({
          Error: "Incorrect token!",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "User Authenticated!", user: req.user });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Logged out!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
