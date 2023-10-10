import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SignupOptionsWithTag.css";
import leaf4 from "../../../Assets/Images/leaf4.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sapidgif from "../../../Assets/Images/sapidgif5.gif";
import sapidvlogo from "../../../Assets/Images/kindlogo.png";
import { useDispatch } from "react-redux";
import { updateLanguage } from "../../../Redux/Login/actions";
import Button from "../../Atoms/Button/Button";
import { useSelector } from "react-redux";
import { updateSelectedLngSelector } from "../../../Redux/Login/selectors";

const SignupOptionsWithTag = () => {
  let { tagId } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  console.log(tagId);

  return (
    <div className="Splash_screen_main_div">
      <div className="Splash_screen_sub_main_div">
        {/* <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "end",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              height: "40px",
              width: "80px",
              textOverflow: "ellipsis",
              background: "white",
              paddingLeft: "5px",
              color: "#07074E",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              objectFit: "contain",
              cursor: "pointer",
              fontFamily: "MadeOuterSansLight, sans-serif",
           
              border: selectedLng == "sp" ? "2px solid black" : "",
            }}
            onClick={() => handleChangeLanguageFunc("sp")}
          >
            <div
              style={{
                height: "80%",
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <img src={esFlag} style={{ height: "100%", width: "100%" }} />
            </div>
            Es
          </div>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              height: "40px",
              width: "80px",
              textOverflow: "ellipsis",
              background: "white",
              paddingLeft: "5px",
              color: "#07074E",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              objectFit: "contain",
              cursor: "pointer",
              fontFamily: "MadeOuterSansLight, sans-serif",
              // border: "1px solid black",
              border: selectedLng == "en" ? "2px solid black" : "",
            }}
            onClick={() => handleChangeLanguageFunc("en")}
          >
            <div
              style={{
                height: "80%",
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <img src={enFlag} style={{ height: "70%", width: "100%" }} />
            </div>
            En
          </div>
        </div> */}
        <div className="kind-logo-main">
          <img
            src={sapidvlogo}
            alt=""
            style={{
              width: "249px",
              height: "62px",
              marginTop: "35px",
            }}
            className="thelogo"
          />
        </div>
        <div className="upper-leaf">
          <img src={leaf4} alt="" className="leaf4" />
        </div>
        {/* <img
          src={sapidvlogo}
          alt=""
          style={{
            width: "249px",
            height: "62px",
            marginTop: "35px",
          
          }}
        /> */}
        {/* <div className="Splash_image_container" style={{ marginTop: "10px" }}> */}
        {/* <img src={sapidgif} alt="" className="Splash_sapid_logo_css" /> */}
        {/*  */}
        {/* </div> */}

        <div
          style={{
            marginBottom: "1rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "6.2rem",
          }}
        >
          <Button
            text={t("signIn")}
            googleIcon={false}
            didPressButton={() =>
              navigate("/signin", { state: { tagUid: tagId } })
            }
            bgwhite={true}
          />
        </div>
        <div
          style={{
            // marginBottom: "1rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "3rem",
            // marginTop: "10px",
          }}
        >
          <Button
            text={t("accountSignUp")}
            applieIcon={false}
            didPressButton={() =>
              navigate("/signup", { state: { tagUid: tagId } })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignupOptionsWithTag;
