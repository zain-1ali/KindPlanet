import React, { useState, useEffect } from "react";
import "../QRCode/QRCode.css";
import MenuIcon from "@mui/icons-material/Menu";
// import QRCode from "qrcode";
import { QRCode } from "react-qrcode-logo";
import Button from "../../Atoms/Button/Button";
import QrReadedr from "react-qr-reader";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import ProfileLogo from "../../../Assets/Icons/profilelogo.svg";
import Drawer from "../Drawer/Drawer";
import { useSelector } from "react-redux";
import { loginUserInfoSelector } from "../../../Redux/Login/selectors";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import BottommSheet from "../../molecules/BottomSheet/BottommSheet";
import { child, get, getDatabase, ref } from "firebase/database";
import { db } from "../../Services/Firebase/config";
import ProfileLogo11 from "../../../Assets/Icons/profileLogo11.svg";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/newContext";
import { getStorage, ref as storagref, getDownloadURL } from "firebase/storage";

const QRCodeScan = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const userId = auth?.currentUser?.uid;
  const dbRef = ref(getDatabase());
  const startX = useRef(0);
  const loginUserData = useSelector(loginUserInfoSelector);
  const [qrImageURL, setQrImageURL] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [profileLink, setProfileLink] = useState();

  let theId = localStorage.getItem("sapiduserid");

  useEffect(() => {
    get(child(dbRef, `BaseUrl`)).then((response) => {
      console.log(response.val(), "sdasd");
      let link = response.val().url + theId;
      // console.log(link, 'console of link')
      // createQRCode("https://www.google.com");
      setProfileLink("https://www.google.com");
    });
  }, []);

  // const createQRCode = async (link) => {
  //   const response = await QRCode.toDataURL("https://www.google.com");
  //   setQrImageURL(response);
  // };

  const handleShareProfile = () => {
    setShowBottomSheet(true);
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
  const storage = getStorage();

  // const [profileurl, setprofileurl] = useState('')
  // if (loginUserData?.profileUrl) {

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
    if (profilestring === "gs://kindp") {
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
  return (
    <div className="qr_code_main">
      <div
        className="qr_code_sub_main"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="hamburger_icon_with_title_main">
          <div className="hamburger_menu_icon_div">
            {/* setShowDrawer(true) */}
            <MenuIcon
              onClick={() => Setopendrawer(true)}
              style={{
                color: "black",
                position: "absolute",
                top: "30px",
                left: "20px",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="qr_code_title_div">{t("qrCodeLink")}</div>
        </div>
        <div className="qr_profile_pic_div_main">
          <div
            className="qr_profile_pic_div"
            style={{
              border: !loginUserData?.profileUrl ? "" : "2px solid grey",
            }}
          >
            {profileurl ? (
              <img src={profileurl} alt="" className="qr_profile_pic_css" />
            ) : (
              <img src={ProfileLogo11} alt="" className="qr_profile_pic_css" />
            )}
          </div>
        </div>
        <div className="qr_code_main_div">
          {/* <img src={qrImageURL} alt="" className="qr_code_generated_css" /> */}
          <QRCode
            value="www.facebook.com"
            size="170"
            // logoImage={qrLogo}
            // fgColor={qrColor ? qrColor : "black"}
            // logoOpacity="0.9"
            // logoWidth="90"
            // logoHeight="90"
          />
        </div>
        <div className="share_profile_link_button">
          <Button
            text={t("shareprofile")}
            didPressButton={handleShareProfile}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BottommSheet
            url={profileLink}
            showSheet={showBottomSheet}
            hideSheet={() => setShowBottomSheet(false)}
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

export default QRCodeScan;
