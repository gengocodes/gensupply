import { useState } from "react";
import logo from "../assets/GenSupply.png";
import { useEffectHooks } from "../hooks/useEffectHooks";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Header() {
  const screenWidth = useEffectHooks();

  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const handleHamburgerClick = () => {
    setHamburgerClicked(!hamburgerClicked);
  };
  return (
    <header className="w-screen h-[80px] bg-slate-50 fixed flex flex-row border-b-zinc-300 border-b border-solid">
      {hamburgerClicked === true ? (
        <nav className="absolute mt-[80px] h-screen w-screen flex bg-red-50 flex-col items-center">
          <div className="h-[60%] w-screen items-center flex flex-col">
            <div className="border-y-zinc-400 border-b border-solid w-[90%] pt-3 pb-3 flex group">
              <div className="w-[50%] flex ">
                {" "}
                <a
                  href="#home"
                  className="no-underline text-[1.5rem] text-zinc-800 font-semibold group-hover:text-red-700 ml-[10px]"
                >
                  Home
                </a>
              </div>
              <div className="w-[50%] flex justify-end items-center">
                <ArrowForwardIosIcon fontSize="medium" className="mr-3" />
              </div>
            </div>
            <div className="border-y-zinc-400 border-b border-solid w-[90%] pt-3 pb-3 flex group">
              <div className="w-[50%] flex">
                {" "}
                <a
                  href="#about"
                  className="no-underline text-[1.5rem] text-zinc-800 font-semibold group-hover:text-red-700 ml-[10px]"
                >
                  About
                </a>
              </div>
              <div className="w-[50%] flex justify-end items-center">
                <ArrowForwardIosIcon fontSize="medium" className="mr-3" />
              </div>
            </div>

            <div className="border-y-zinc-400 border-b border-solid w-[90%] pt-3 pb-3 flex group">
              <div className="w-[50%] flex">
                {" "}
                <a
                  href="#pricing"
                  className="no-underline text-[1.5rem] text-zinc-800 font-semibold group-hover:text-red-700 ml-[10px]"
                >
                  Pricing
                </a>
              </div>
              <div className="w-[50%] flex justify-end items-center">
                <ArrowForwardIosIcon fontSize="medium" className="mr-3" />
              </div>
            </div>
            <div className="border-y-zinc-400 border-b border-solid w-[90%] pt-3 pb-3 flex group">
              <div className="w-[50%] flex">
                {" "}
                <a
                  href="#demo"
                  className="no-underline text-[1.5rem] text-zinc-800 font-semibold group-hover:text-red-700 ml-[10px]"
                >
                  Demo
                </a>
              </div>
              <div className="w-[50%] flex justify-end items-center">
                <ArrowForwardIosIcon fontSize="medium" className="mr-3" />
              </div>
            </div>
          </div>
          <div className="h-[40%] w-screen flex flex-col items-center">
            <a
              href="/register"
              className="no-underline text-[1.2rem] font-semibold pl-10 pr-10 pt-2 pb-2 rounded-lg w-[90%] flex justify-center bg-red-700 text-[white] hover:text-orange-100 hover:bg-red-600 ml-[10px]"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="no-underline text-[1.2rem] text-red-700 pl-10 pr-10 pt-2 pb-2 font-semibold w-[90%] flex justify-center ml-[10px] mt-4 border-[1px] rounded-[10px] border-solid border-red-700 hover:bg-zinc-200 "
            >
              Log In
            </a>
          </div>
        </nav>
      ) : (
        <></>
      )}
      <div className="flex w-[50%] items-center justify-start ">
        {screenWidth > 820 ? (
          <>
            <img
              src={logo}
              alt="GenSupply Logo"
              className="h-[60px] w-[60px] ml-[30px]"
            />
            <nav>
              <a
                href="#home"
                className="no-underline text-[1.5rem] text-zinc-800 ml-[30px] font-semibold hover:text-red-700"
              >
                Home
              </a>
              <a
                href="#about"
                className="no-underline text-[1.5rem] text-zinc-800 ml-[30px] font-semibold hover:text-red-700"
              >
                About
              </a>
              <a
                href="#pricing"
                className="no-underline text-[1.5rem] text-zinc-800 ml-[30px] font-semibold hover:text-red-700"
              >
                Pricing
              </a>
            </nav>
          </>
        ) : (
          <>
            <img
              src={logo}
              alt="GenSupply Logo"
              className="h-[50px] w-[50px] ml-[30px]"
            />
          </>
        )}
      </div>
      <div className="flex w-[50%] items-center justify-end">
        {screenWidth > 820 ? (
          <>
            <a
              href="/demo"
              className="no-underline text-[1.5rem] text-zinc-800 mr-[30px] font-semibold hover:text-red-700"
            >
              Demo
            </a>
            <a
              href="/login"
              className="no-underline text-[1.5rem] text-zinc-800 mr-[30px] font-semibold hover:text-red-700"
            >
              Login
            </a>
            <a
              href="/register"
              className="no-underline text-[1.5rem] text-zinc-800 mr-[30px] font-semibold hover:text-red-700 "
            >
              Create Account
            </a>
          </>
        ) : (
          <>
            {hamburgerClicked === true ? (
              <>
                {" "}
                <CloseIcon
                  onClick={handleHamburgerClick}
                  fontSize="large"
                  className="mr-[30px]"
                />
              </>
            ) : (
              <>
                <MenuIcon
                  onClick={handleHamburgerClick}
                  fontSize="large"
                  className="mr-[30px]"
                />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
