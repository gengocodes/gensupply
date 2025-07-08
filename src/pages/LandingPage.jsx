import React from "react";
import { useEffectHooks } from "../hooks/useEffectHooks";
import mockup from "../assets/mockup.jpg";
import "animate.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

function LandingPage() {
  const screenWidth = useEffectHooks();

  return (
    <>
      <Header />
      {screenWidth > 900 ? (
        <>
          <section className="mt-[80px] h-[1000px] w-full flex flex-row overflow-x-hidden">
            <div className="w-[70%] h-[600px] bg-red-500 animate__animated animate__fadeInTopLeft">
              {" "}
            </div>
            <div className="w-[30%] h-[600px] bg-slate-100 flex items-center ">
              {" "}
              <img
                src={mockup}
                className="absolute h-[30vw] w-[45vw] right-0 mr-14 border-[5px] border-solid border-slate-100 animate__animated animate__fadeInBottomRight"
                alt="Stock warehouse"
              />
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default LandingPage;
