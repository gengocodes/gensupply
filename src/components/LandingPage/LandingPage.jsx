import React, { useEffect, useState } from "react";
import logo from "../../assets/GenSupply.png";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

function LandingPage() {
  const nav = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navLogin = () => {
    nav("/login");
  };
  const navRegister = () => {
    nav("/register");
  };
  const handleHamburgerClick = () => {
    setHamburgerClicked(!hamburgerClicked);
  };
  return (
    <div className="landingpage-container">
      <div className="landing-header">
        <div className="landing-header-left">
          {screenWidth > 600 ? (
            <>
              {" "}
              <img src={logo} alt="GenSupply Logo" />
              <h2>
                <span className="header-text">Home</span>
              </h2>
              <h2>
                <span className="header-text">About</span>
              </h2>
              <h2>
                <span className="header-text">Pricing</span>
              </h2>
            </>
          ) : (
            <>
              <img
                src={logo}
                alt="GenSupply Logo"
                style={{ margin: "0 0 0 25px" }}
              />
            </>
          )}
        </div>
        <div className="landing-header-right">
          {screenWidth > 600 ? (
            <>
              <h2>
                <span className="header-text">Demo</span>
              </h2>
              <h2>
                <span onClick={navLogin} className="header-text">
                  Login
                </span>
              </h2>
              <h2 onClick={navRegister}>
                <span className="header-margin header-text">
                  Create Account
                </span>
              </h2>
            </>
          ) : (
            <>
              {hamburgerClicked === false ? (
                <>
                  <span
                    className="header-margin"
                    style={{ display: "flex", margin: "0 25px 0 0" }}
                    onClick={handleHamburgerClick}
                  >
                    <MenuIcon style={{ height: "30px", width: "30px" }} />
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <span
                    style={{ display: "flex", margin: "0 25px 0 0" }}
                    onClick={handleHamburgerClick}
                  >
                    <MenuOpenIcon style={{ height: "30px", width: "30px" }} />
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="landing-body">
        <div>{screenWidth}</div>
      </div>
    </div>
  );
}

export default LandingPage;
