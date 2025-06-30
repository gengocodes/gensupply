import React, { useState } from "react";
import logo from "../assets/GenSupply.png";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { NavigationHooks } from "../hooks/NavigationHooks";
import { useEffectHooks } from "../hooks/useEffectHooks";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

function LandingPage() {
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const { navLogin, navRegister } = NavigationHooks();
  const screenWidth = useEffectHooks();

  const handleHamburgerClick = () => {
    setHamburgerClicked(!hamburgerClicked);
  };
  return (
    <>
      <Header />
      <div className="pt-[120px]">test</div>
      <main className="container" style={{ backgroundColor: "whitesmoke" }}>
        {" "}
        containerasdasd
      </main>
    </>
    // <div className="landingpage-container">
    //   <div className="landing-header">
    //     <div className="landing-header-left">
    //       {screenWidth > 600 ? (
    //         <>
    //           {" "}
    //           <img src={logo} alt="GenSupply Logo" />
    //           <h2>
    //             <span className="header-text">Home</span>
    //           </h2>
    //           <h2>
    //             <span className="header-text">About</span>
    //           </h2>
    //           <h2>
    //             <span className="header-text">Pricing</span>
    //           </h2>
    //         </>
    //       ) : (
    //         <>
    //           <img
    //             src={logo}
    //             alt="GenSupply Logo"
    //             style={{ margin: "0 0 0 25px" }}
    //           />
    //         </>
    //       )}
    //     </div>
    //     <div className="landing-header-right">
    //       {screenWidth > 600 ? (
    //         <>
    //           <h2>
    //             <span className="header-text">Demo</span>
    //           </h2>
    //           <h2>
    //             <span onClick={navLogin} className="header-text">
    //               Login
    //             </span>
    //           </h2>
    //           <h2 onClick={navRegister}>
    //             <span className="header-margin header-text">
    //               Create Account
    //             </span>
    //           </h2>
    //         </>
    //       ) : (
    //         DD
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>
    //   <div className="landing-body">
    //     <div>{screenWidth}</div>
    //     <Button variant="danger">React bootstrap</Button>
    //   </div>
    // </div>
  );
}

export default LandingPage;
