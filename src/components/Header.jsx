import { useState } from "react";
import logo from "../assets/GenSupply.png";
import { useEffectHooks } from "../hooks/useEffectHooks";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { NavigationHooks } from "../hooks/NavigationHooks";

function Header() {
  const screenWidth = useEffectHooks();
  const { navLogin, navRegister } = NavigationHooks();

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const handleHamburgerClick = () => {
    setHamburgerClicked(!hamburgerClicked);
  };
  return (
    <header className="w-screen h-[100px] fixed flex flex-row ">
      <div className="flex w-[50%] bg-slate-500 items-center justify-start ">
        {screenWidth > 600 ? (
          <>
            <img
              src={logo}
              alt="GenSupply Logo"
              className="h-[60px] w-[60px]"
            />
            <nav>
              <a href="" className="no-underline text-[2rem] text-[white]">
                Home
              </a>
              <a href="" className="no-underline text-[2rem] text-[white]">
                About
              </a>
              <a href="" className="no-underline text-[2rem] text-[white]">
                Pricing
              </a>
            </nav>
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
      <div className="flex w-[50%] flex-row justify-end bg-zinc-700">
        {screenWidth > 600 ? (
          <nav>
            <h2>
              <span className="header-text">Demo</span>
            </h2>
            <h2>
              <span onClick={navLogin} className="header-text">
                Login
              </span>
            </h2>
            <h2 onClick={navRegister}>
              <span className="header-margin header-text cancel-margin">
                Create Account
              </span>
            </h2>
          </nav>
        ) : (
          <>
            {hamburgerClicked === true ? (
              <>
                {" "}
                <MenuIcon onClick={handleHamburgerClick} />
              </>
            ) : (
              <>
                <MenuOpenIcon onClick={handleHamburgerClick} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
