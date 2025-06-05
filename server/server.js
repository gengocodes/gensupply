import express from "express"; //server side
import mysql from "mysql"; //database
import cors from "cors"; //access backend api using frontend
import nodemon from "nodemon"; //auto refresh server side
import cookieParser from "cookie-parser"; //cookies
import jwt from "jsonwebtoken"; //authentication(security)
import bcrypt from "bcrypt"; //hash pwds
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
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

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Server Login Error!" });
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
            return res.json({ Status: "Correct Password!" });
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

app.listen(1234, () => {
  console.log("Server running...");
});
