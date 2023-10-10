import React from "react";
import "../Button/Button.css";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "../../../Assets/Icons/google.svg";
import FacebookIcon from "../../../Assets/Icons/facebook.svg";
import { ClipLoader } from "react-spinners";

const Button = ({
  text,
  bgwhite,
  applieIcon,
  googleIcon,
  facebookIcon,
  didPressButton,
  btnLoading,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // color: bgwhite ? "#07074E" : "white",
        color: "white",
        backgroundColor: bgwhite ? "#CF9C9C" : "#8C6766",
        width: "296px",
        height: "52px",
        // borderRadius: "10px",
        borderRadius: "30px",
        // fontFamily: "MADE Outer Sans Outline sans-serif",
        fontSize: "15px",
        cursor: "pointer",
        boxShadow: "2px 2px 2px 2px grey",
        alignSelf: "center",
      }}
      className="globalButtonClassName"
      onClick={() => didPressButton()}
    >
      {applieIcon && (
        <AppleIcon style={{ color: "white", marginRight: "10px" }} />
      )}
      {googleIcon && (
        <div
          style={{
            height: "25px",
            width: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2px",
          }}
        >
          <img
            src={GoogleIcon}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />{" "}
        </div>
      )}
      {facebookIcon && (
        <div
          style={{
            height: "25px",
            width: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2px",
          }}
        >
          {" "}
          <img
            src={FacebookIcon}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      )}
      {btnLoading ? <ClipLoader color="white" /> : text}
    </div>
  );
};

export default Button;
