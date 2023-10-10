import React, { useContext, useEffect, useRef, useState } from "react";
import "../ActivateSapid/ActivateSapid.css";
import MenuIcon from "@mui/icons-material/Menu";
import SpiderManPic from "../../../Assets/Images/spiderman.png";
import Button from "../../Atoms/Button/Button";
import Drawer from "../../organisms/Drawer/Drawer";
import { useSelector } from "react-redux";
import { loginUserInfoSelector } from "../../../Redux/Login/selectors";
import { useTranslation } from "react-i18next";
import ActivateSapidDialog from "../../Atoms/Dialog/ActivateSapidDialog";
import { AppContext } from "../../../context/newContext";
import { getStorage, ref as storagref, getDownloadURL } from "firebase/storage";
import AppleIcon from "@mui/icons-material/Apple";
import AdbIcon from "@mui/icons-material/Adb";
import ProfileLogo11 from "../../../Assets/Icons/profileLogo11.svg";
import googleIcon from "../../../Assets/Images/googlepng.png";
import appIcon from "../../../Assets/Images/applepng.png";

const ActivateSapid = () => {
  const loginUserData = useSelector(loginUserInfoSelector);
  const startX = useRef(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const handleActivateButton = () => {
    setShowModal(true);
  };

  const handleAndroidClickedFunc = () => {
    window.open("https://play.google.com/store/apps/");
  };

  const handleAppleClickedFunc = () => {
    window.open("https://apps.apple.com");
  };

  const handleTouchStart = (event) => {
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    const deltaX = startX.current - currentX;
    if (deltaX > 50) {
      setShowDrawer(false);
    }
  };

  // const [profileurl, setprofileurl] = useState('')

  // if (loginUserData?.profileUrl) {
  //   const storage = getStorage();
  //   const storageRef = storagref(storage, loginUserData?.profileUrl)
  //   getDownloadURL(storageRef).then((URL) => {
  //     console.log(URL)
  //     setprofileurl(URL)

  //   }).catch((error) => {
  //     console.log(error)
  //   });
  // }

  const [profileurl, setprofileurl] = useState("");

  // let theprovider2 = localStorage.getItem("provider")
  useEffect(() => {
    let profilestring = loginUserData?.profileUrl?.slice(0, 10);
    if (profilestring === "gs://testi") {
      if (loginUserData?.profileUrl) {
        const storage = getStorage();
        const fileRef = storagref(storage, loginUserData?.profileUrl);
        console.log(loginUserData.profileUrl);

        getDownloadURL(fileRef)
          .then((URL) => {
            console.log(URL);
            setprofileurl(URL);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setprofileurl(loginUserData?.profileUrl);
    }
  }, []);

  let { Opendrawer, Setopendrawer } = useContext(AppContext);

  console.log(loginUserData?.username);

  return (
    <div className="actvate_sapid_main_div">
      <div
        className="activate_sapid_sub_main_div"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="hamburger_icon_mainn_div">
          <MenuIcon
            onClick={() => Setopendrawer(true)}
            // setShowDrawer(true)
            style={{
              color: "black",
              position: "absolute",
              top: "30px",
              left: "20px",
              fontSize: "2rem",
            }}
          />
        </div>
        <div className="activate_sapid_profile_pic_main_div">
          <img
            src={profileurl ? profileurl : ProfileLogo11}
            alt=""
            className="spider_man_profile_pic_css"
          />
        </div>
        <div className="activate_sapid_info_paragraph">
          {t("sapidProductActivatedUserName")}
          <span
            style={{ fontWeight: "bold", fontSize: "larger", color: "#8C6766" }}
          >
            {loginUserData?.username}
          </span>
        </div>
        {/* <div className="activate_sapid_card_button_div">
          <Button text={t("ActivateSapidCard")} didPressButton={handleActivateButton} />
        </div> */}
        <div className="activate_sapid_card_button_div">
          <img
            src={googleIcon}
            alt="goole"
            style={{ height: "45px", width: "45%", cursor: "pointer" }}
            onClick={() => handleAndroidClickedFunc()}
          />
          <img
            src={appIcon}
            alt="apple"
            style={{ height: "45px", width: "45%", cursor: "pointer" }}
            onClick={() => handleAppleClickedFunc()}
          />

          {/* <button onClick={() => handleAppleClickedFunc()}
            style={{
              height: "40px",
              color: "white",
              width: "105px",
              borderRadius: "6px",
              
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#7665cf",
              
              textTransform: "capitalize",
              fontSize: "16px",
              fontFamily: 'MadeOuterSansLight, sans-serif',
              border: 'none',
              outline: 'none'
            }}
          >
            <AppleIcon style={{ color: "white", marginRight: "5px" }} />
            Apple
          </button>
          <button onClick={() => handleAndroidClickedFunc()}
            style={{
              height: "40px",
              color: "white",
              width: "105px",
              borderRadius: "6px",
             
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#7665cf",
           
              textTransform: "capitalize",
              fontSize: "15px",
              fontFamily: 'MadeOuterSansLight, sans-serif',
              border: 'none',
              outline: 'none'
            }}
          >
            <AdbIcon style={{ color: "white", marginRight: '5px' }} />
            Android
          </button> */}
        </div>
        <div>
          <ActivateSapidDialog
            showPopup={showModal}
            hidePopup={() => setShowModal(false)}
            androidClicked={() => handleAndroidClickedFunc()}
            appleClicked={() => handleAppleClickedFunc()}
          />
        </div>
        {Opendrawer && (
          // showDrawer
          <div className="sideDrawer_main_div">
            <Drawer />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivateSapid;
