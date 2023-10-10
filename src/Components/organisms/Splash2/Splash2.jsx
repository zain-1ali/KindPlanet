import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kindlogo from "../../../Assets/Images/kindlogo.png";
import leaf1 from "../../../Assets/Images/leaf1.png";
import leaf2 from "../../../Assets/Images/leaf3.png";
import "./Splash2.css";

const Splash2 = () => {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/signoption");
    }, 2000);
  }, []);
  return (
    <div className="Splash_screen_main">
      <div className="Splash_screen_sub_main">
        <div className="upper-leaf-main">
          <img src={leaf1} alt="" className="leaf1" />
        </div>
        <div className="logo-main">
          <img src={kindlogo} alt="" className="kindlogo" />
        </div>

        <div className="btm-leaf-main">
          <img src={leaf2} alt="" className="leaf2" />
        </div>
      </div>
    </div>
  );
};

export default Splash2;
