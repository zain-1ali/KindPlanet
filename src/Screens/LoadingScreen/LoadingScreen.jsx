import React from "react";
import "./loadingscreen.css";
import { BeatLoader } from "react-spinners";
import sapidlogo from "./sapidimg/sapidtransparent.png";
import sapidvlogo from "../../Assets/Images/kindlogo.png";

const LoadingScreen = () => {
  return (
    <div className="loading_screen">
      <div className="loading-sub-screen">
        <div className="image_container">
          <img src={sapidvlogo} alt="Sapid" className="sapid-logo" />
        </div>
        <BeatLoader color="#8C6766" />
      </div>
    </div>
  );
};

export default LoadingScreen;
