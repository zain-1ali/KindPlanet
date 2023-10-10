import React, { useState } from "react";
import "../Drawer/Drawer.css";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../../Assets/Icons/home1.svg";
import LinkIcon from "../../../Assets/Icons/link.svg";
import ProfileLogo from "../../../Assets/Icons/profilelogo.svg";
import Profile from "../../../Assets/Icons/profile2.svg";
import QRCodeIcon from "../../../Assets/Icons/qrcode1.svg";
import ShopIcon from "../../../Assets/Icons/shop.svg";
import LogoutIcon from "../../../Assets/Icons/logout1.svg";
import WebsiteIcon from "../../../Assets/Icons/globalIcon.svg";
import DeleteIcon from "../../../Assets/Icons/delete1.svg";
import ChangeEmailIcon from "../../../Assets/Icons/changeemail1.svg";
import TranslationIcon from "../../../Assets/Icons/translation1.svg";
import ChangePasswordIcon from "../../../Assets/Icons/changepassword1.svg";
import ChangePasswordSlider from "../../molecules/Slide/ChangePasswordSlider";
import ChangeEmailSlider from "../../molecules/Slide/ChangeEmailSlider";
import ChangeLanguagePopup from "../../Atoms/Dialog/ChangeLanguagePopup";
import { getStorage, ref as storagref, getDownloadURL } from "firebase/storage";
import { deleteSignedUser } from "../../Services/Firebase/config";

import { useContext } from "react";

import { AppContext } from "../../../context/newContext";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
} from "firebase/auth";
import ProfileSwitchPopup from "../../Atoms/Dialog/ProfileSwitchPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserInfoSelector,
  updateSelectedLngSelector,
} from "../../../Redux/Login/selectors";
import { toast, ToastContainer } from "react-toastify";
import {
  loginUserObj,
  resetUser,
  updateLanguage,
} from "../../../Redux/Login/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import { useTranslation } from "react-i18next";
import AlertMessage from "../../Atoms/Dialog/AlertMessage";
import CredentialsPopup from "../../Atoms/Dialog/CredentialsPopup";
import { app } from "../../Services/Firebase/config";
import ProfileLogo11 from "../../../Assets/Icons/profileLogo11.svg";
import enFlag from "../../../Assets/Icons/usa.png";
import spFlag from "../../../Assets/Icons/spain.png";
import { useEffect } from "react";

const Drawer = ({ hideDrawer, closedrawer }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const auth = getAuth();
  const dispatch = useDispatch();
  const loginUserData = useSelector(loginUserInfoSelector);
  const selectedLang = useSelector(updateSelectedLngSelector);
  const [showChangePasswordSlider, setShowChangePasswordSlider] =
    useState(false);
  const [showChangeEmailSlider, setShowChangeEmailSlider] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showProfileSwitchPopup, setShowProfileSwitchPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    text: "",
    errorType: "",
  });
  const [showCredentialPopup, setShowCredentialPopup] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [selectLanguage, setSelectLanguage] = useState({
    en: selectedLang == "en" ? true : false,
    sp: selectedLang == "sp" ? true : false,
  });
  const [profile, setProfile] = useState({
    on: loginUserData?.profileOn,
    off: loginUserData?.profileOn,
  });

  const changePasswordClickFunc = () => {
    setShowChangePasswordSlider(true);
  };

  const showAlertMessage = (showAlert, errorType, title, text) => {
    setAlert({
      ...alert,
      title: title,
      text: text,
      errorType: errorType,
    });
    setShowAlert(showAlert);
  };

  const changePasswordSliderTextOnChange = (e) => {
    const { name, value } = e.target;
    setResetPassword({ ...resetPassword, [name]: value });
  };

  const handleChangePasswordSubmit = (password) => {
    if (password?.password == "" || password?.confirmPassword == "") {
      showAlertMessage(true, "alert", t("Alert"), t("makeSureFieldsFilled"));
    } else if (password.password != password?.confirmPassword) {
      showAlertMessage(true, "alert", t("Alert"), t("makeSurePasswordMatched"));
    } else if (password?.password?.length < 6) {
      showAlertMessage(true, "alert", t("Alert"), t("passwordInstructions"));
    } else {
      const user = auth.currentUser;
      user
        .updatePassword(password?.password)
        .then(function () {
          console.log("passwowrd updated successfuly");
        })
        .catch((error) => {
          toast(error.message);
        });
    }
  };

  const handleChangeEmailSubmit = (inputData) => {
    const emailRegEx =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (emailRegEx.test(newEmail)) {
      let usersArray = [];
      get(child(dbRef, `User`)).then((response) => {
        const users = response?.val();
        const exists = Object.values(users).some(
          (item) => item.email == inputData
        );
        if (exists) {
          showAlertMessage(true, "alert", t("Alert"), t("emailAlreadyExists"));
        } else {
          const userId = auth?.currentUser?.uid;
          updateEmail(auth.currentUser, inputData).then(() => {
            update(ref(db, "User/" + userId), {
              email: inputData,
            });
            get(child(dbRef, `User/${userId}`)).then((response) => {
              dispatch(loginUserObj(response.val()));
            });
            toast(t("emailUpdatedSuccess"));
            setNewEmail("");
            setShowChangeEmailSlider(false);
          });
        }
      });
    } else {
      showAlertMessage(true, "alert", t("Alert"), t("validEmailError"));
    }
  };

  const emailChangetextFieldOnChange = (e) => {
    // console.log(e.target.value, 'onchange text')
    setNewEmail(e.target.value);
  };

  const handleProfileOnFunc = () => {
    console.log(profile.on, "this is the profile on and off status");
    // if (profile.off) {
    const userId = auth?.currentUser?.uid;
    console.log(userId);
    update(ref(db, "User/" + userId), {
      profileOn: 1,
    });
    get(child(dbRef, `User/${userId}`)).then((response) => {
      dispatch(loginUserObj(response.val()));
    });
    setProfile({
      off: false,
      on: true,
    });
    setShowProfileSwitchPopup(true);
    // }
  };

  const handleProfileOffFunc = () => {
    console.log(profile.off, "this is the console of profile off");
    if (profile?.on) {
      const userId = auth?.currentUser?.uid;
      update(ref(db, "User/" + userId), {
        profileOn: 0,
      });
      get(child(dbRef, `User/${userId}`)).then((response) => {
        dispatch(loginUserObj(response.val()));
      });
      setProfile({
        off: true,
        on: false,
      });
      setShowProfileSwitchPopup(true);
    }
  };

  const handleLogoutFunc = () => {
    signOut(auth).then(() => {
      dispatch(resetUser());
      localStorage.removeItem("provider");
      localStorage.removeItem("email");
      localStorage.removeItem("pass");
      localStorage.removeItem("user_email");
      navigate("/");
    });
  };

  const handleSelectedLanguage = (selectedLang) => {
    i18n?.changeLanguage(selectedLang);
    setShowLanguagePopup(false);
  };

  const handleChangeLanguageFunc = (selectedLang) => {
    const userId = auth?.currentUser?.uid;
    localStorage.setItem("lang", selectedLang);
    if (selectedLang == "en") {
      setSelectLanguage({ ...selectLanguage, en: true, sp: false });
      update(ref(db, "User/" + userId), {
        language: "en",
      });
    } else {
      setSelectLanguage({ ...selectLanguage, sp: true, en: false });
      update(ref(db, "User/" + userId), {
        language: "es",
      });
    }
    localStorage.setItem("lang", selectedLang);
    i18n?.changeLanguage(selectedLang);
    dispatch(updateLanguage(selectedLang));
  };

  const handleAlertConfirmPressed = () => {};

  const afterdell = () => {
    setShowCredentialPopup(false);
    toast.success(t("userdeleted"));
    setTimeout(() => {
      navigate("/signup/with");
    }, 2000);
    // let usid = localStorage.getItem("usid")
    // remove(ref(db, "User/" + usid))
    //   .then(() => {
    //     toast.success(t("userdeleted"));
    //     setShowCredentialPopup(false);
    //     setTimeout(() => {
    //       navigate("/signup/with");
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     console.log(error, "error console of removing user");
    //   });
  };

  const handleCredentialSubmitButton = async () => {
    // setShowCredentialPopup(false);
    // const auth = getAuth();
    // const user = auth.currentUser;
    // const userId = currentuser.uid
    // let cuuruser;
    // let ui;
    //  onAuthStateChanged(auth, async (user) => {
    //     cuuruser = user;
    //     ui = user.uid
    //   })
    //   console.log(cuuruser)
    //   await cuuruser.deleteUser()
    //     .then(() => {
    //       navigate("/signup/with")
    //       // remove(ref(db, "User/" + userid))
    //       //   .then(() => {
    //       //     toast("User Deleted Successfully!");
    //       //     setShowCredentialPopup(false);
    //       //     setTimeout(() => {
    //       //       navigate("/signup/with");
    //       //     }, 2000);
    //       //   })
    //       //   .catch((error) => {
    //       //     console.log(error, "error console of removing user");
    //       //   });
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    // });
    // deleteUser(user).then(() => {
    //   toast.success(t("userdeleted"));
    //   console.log('user deleted')
    //   setShowCredentialPopup(false);
    //   // setTimeout(() => {
    //   navigate("/signup/with");
    //   // }, 2000);
    // }).catch((error) => {
    //   // An error ocurred
    //   console.log(error)
    //   // ...
    // });
    // const credential = EmailAuthProvider.credential(
    //   credentials.email,
    //   credentials.password
    // );
    // user?.providerData.map((item) => {
    //   if (
    //     item.providerId == "google.com" ||
    //     item.providerId == "facebook.com"
    //   ) {
    //     deleteUser(user)
    //       .then(() => {
    //         remove(ref(db, "User/" + userId))
    //           .then(() => {
    //             toast("User Deleted Successfully!");
    //             setShowCredentialPopup(false);
    //             setTimeout(() => {
    //               navigate("/signup/with");
    //             }, 2000);
    //           })
    //           .catch((error) => {
    //             console.log(error, "error console of removing user");
    //           });
    //       })
    //       .catch((error) => {
    //         toast(error.message);
    //       });
    //   } else if (item.providerId == "password") {
    //     if (credentials?.email == "" || credentials?.password == "") {
    //       setShowCredentialPopup(false);
    //       showAlertMessage(true, "alert", "Missing", t("makeSureFieldsFilled"));
    //     } else {
    //       reauthenticateWithCredential(user, credential).then(() => {
    //         deleteUser(user)
    //           .then(() => {
    //             remove(ref(db, "User/" + userId)).then(() => {
    //               toast("User Deleted Successfully!");
    //               setShowCredentialPopup(false);
    //               setTimeout(() => {
    //                 navigate("/signup/with");
    //               }, 2000);
    //             });
    //           })
    //           .catch((error) => {
    //             toast(error.message);
    //           });
    //       });
    //     }
    //   }
    // });
  };

  const handleConfirmPressbtn = () => {
    if (alert.title == "Missing") {
      setShowAlert(false);
      setShowCredentialPopup(true);
    } else {
      setShowAlert(false);
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
    setNewEmail(loginUserData.email);
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

  let handlepredelete = () => {
    setShowCredentialPopup(true);
    localStorage.removeItem("provider");
  };

  let { Opendrawer, Setopendrawer } = useContext(AppContext);

  let changeEmailFunc = () => {
    setShowChangeEmailSlider(true);
    // Setopendrawer(false);
    // if (!Opendrawer) {

    // }
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "flex" }}>
      <ChangeEmailSlider
        showSlide={showChangeEmailSlider}
        Setopendrawer={() => changeEmailFunc()}
        hideSlide={() => setShowChangeEmailSlider(false)}
        newEmail={newEmail}
        submit={(inputData) => handleChangeEmailSubmit(inputData)}
        changeEmailTextOnChange={(e) => emailChangetextFieldOnChange(e)}
      />

      <ChangePasswordSlider
        showSlide={showChangePasswordSlider}
        hideSlide={() => setShowChangePasswordSlider(false)}
        password={resetPassword}
        submit={(inputData) => handleChangePasswordSubmit(inputData)}
        changePasswordSliderTextOnChange={(e) =>
          changePasswordSliderTextOnChange(e)
        }
      />
      <div className="drawer_main_div" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: "4px",
            top: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            return Setopendrawer(false);
          }}
        >
          {/* hideDrawer() && closedrawer() */}
          <CancelIcon />
        </div>

        {/* <div className="change_language_switch_main">
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
              fontFamily: "MadeOuterSansLight, sans-serif",
              objectFit: "contain",
              cursor: "pointer",
              marginTop: "17px",
              border: selectLanguage?.sp ? "2px solid black" : "",
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
              <img src={spFlag} style={{ height: "100%", width: "100%" }} />
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
              marginTop: "17px",
              alignItems: "center",
              objectFit: "contain",
              cursor: "pointer",
              fontFamily: "MadeOuterSansLight, sans-serif",
              border: selectLanguage?.en ? "2px solid black" : "",
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
        <div
          className="profile_name_email_main"
          onClick={() => Setopendrawer(false)}
        >
          <div
            className="drawer_profile_pic_div"
            style={{
              border: !profileurl ? "" : "2px solid grey",
            }}
            onClick={() => navigate("/edit/home")}
          >
            {profileurl ? (
              <img
                src={profileurl}
                alt=""
                className="drawer_profile_pic_css"
                onClick={() => navigate("/edit/home")}
              />
            ) : (
              <img
                src={ProfileLogo11}
                x
                alt=""
                className="drawer_profile_pic_css"
                onClick={() => navigate("/edit/home")}
              />
            )}
          </div>
          <div className="name_email_main">
            <div className="name_csss" onClick={() => navigate("/edit/home")}>
              {loginUserData.name}
            </div>
            <div className="email_css" onClick={() => navigate("/edit/home")}>
              {loginUserData.email}
            </div>
          </div>
        </div>
        <div className="profile_off_profile_on_switch_main">
          <div className="option_profile_css">{t("profile")}:</div>
          <div className="profile_sub_main_on_off">
            <div
              style={{
                whiteSpace: "nowrap",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                width: "75px",
                textOverflow: "ellipsis",
                background: !profile.on ? "#CF9C9C" : "transparent",
                // borderRadius: "5px",
                paddingLeft: "5px",
                color: "white",
              }}
              onClick={() => handleProfileOffFunc()}
            >
              {t("profileOff")}
            </div>
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "80px",
                textOverflow: "ellipsis",
                background: profile.on ? "#CF9C9C" : "transparent",
                // borderRadius: "5px",
                paddingLeft: "5px",
                color: "white",
              }}
              onClick={() => handleProfileOnFunc()}
            >
              {t("profileOn")}
            </div>
          </div>
        </div>
        <div className="drawer_options_main">
          <div
            className="option_icon_with_text_main"
            onClick={() => {
              navigate("/home");
              Setopendrawer(false);
            }}
            // onClick={() => { return Setopendrawer(false) }}
          >
            <div className="icon_csss_div">
              <img
                src={HomeIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
              />
            </div>
            <div className="option_name_css">{t("Home")}</div>
          </div>
          {/* <div
            className="option_icon_with_text_main"
            onClick={() => {
              navigate("/activate/sapid");
              Setopendrawer(false);
            }}
          >
            <div className="icon_csss_div">
              <img
                src={LinkIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
              />
            </div>
            <div className="option_name_css">{t("activeSapidDevice")}</div>
          </div> */}
          <div
            className="option_icon_with_text_main"
            onClick={() => {
              navigate("/edit/home");
              Setopendrawer(false);
            }}
          >
            <div className="icon_csss_div">
              <img
                src={Profile}
                alt=""
                style={{ height: "90%", width: "90%" }}
              />
            </div>
            <div className="option_name_css">{t("sapidProfile")}</div>
          </div>
          <div
            className="option_icon_with_text_main"
            onClick={() => {
              navigate("/scan/your/code");
              Setopendrawer(false);
            }}
          >
            <div className="icon_csss_div">
              <img
                src={QRCodeIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
              />
            </div>
            <div className="option_name_css">{t("myQrCode")}</div>
          </div>
          <div
            className="option_icon_with_text_main"
            onClick={() => {
              // window.open("https://shop.sapid.mx", "_blank");
              setShowChangePasswordSlider(true);
            }}
          >
            <div className="icon_csss_div">
              <PasswordIcon />
            </div>
            <div className="option_name_css">Change Password</div>
          </div>
          {/* <div
            className="option_icon_with_text_main"
            onClick={() => {
              
              Setopendrawer(false);
            }}
          >
            <div className="icon_csss_div">
              <img
                src={ChangeEmailIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
              />
             
            </div>
            
            <div className="option_name_css">{t("Website")} </div>
          </div> */}
          <div className="option_icon_with_text_main">
            <div className="icon_csss_div">
              <MailOutlineIcon />
            </div>
            <div className="option_name_css" onClick={() => changeEmailFunc()}>
              {t("changeEmail")}
            </div>
          </div>
          {/* <div className="option_icon_with_text_main">
            <div className="icon_csss_div">
              <img
                src={TranslationIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
                onClick={() => setShowLanguagePopup(true)}
              />
            </div>
            <div
              className="option_name_css"
              onClick={() => setShowLanguagePopup(true)}
            >
              {t("Language")}
            </div>
          </div> */}
          {/* <div className="option_icon_with_text_main">
            <div className="icon_csss_div">
              <img
                src={ChangePasswordIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
                onClick={() => changePasswordClickFunc()}
              />
            </div>
            <div
              className="option_name_css"
              onClick={() => changePasswordClickFunc()}
            >
              {t("changePassword")}
            </div>
          </div> */}
          <div className="option_icon_with_text_main">
            <div className="icon_csss_div">
              <img
                src={DeleteIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
                // onClick={() => changePasswordClickFunc()}
              />
            </div>
            <div
              className="option_name_css"
              onClick={() => setShowCredentialPopup(true)}
            >
              {t("deleteAccount")}
            </div>
          </div>
          <div
            className="logout_icon_with_text"
            onClick={() => {
              handleLogoutFunc();
              Setopendrawer(false);
            }}
          >
            <div className="icon_csss_divv">
              <img
                src={LogoutIcon}
                alt=""
                style={{ height: "90%", width: "90%" }}
              />
            </div>
            <div className="logout_text_css">{t("Logout")} </div>
          </div>
          <div className="app_version_className">{t("version")}: 1.2.5</div>
        </div>
      </div>
      <div
        style={{
          width: "35%",
          height: "100%",
          backgroundColor: "black",
          opacity: "40%",
        }}
        onClick={() => {
          return Setopendrawer(false);
        }}
      ></div>
      <div>
        <ChangeLanguagePopup
          showPopup={showLanguagePopup}
          hidePopup={() => setShowLanguagePopup(false)}
          submit={(lang) => handleSelectedLanguage(lang)}
        />
        <ProfileSwitchPopup
          showPopup={showProfileSwitchPopup}
          hidePopup={() => setShowProfileSwitchPopup(false)}
          submit={() => setShowProfileSwitchPopup(false)}
          text={
            profile?.on
              ? t("profileOnInstrucion")
              : profile?.off
              ? t("profileOffInstrucion")
              : ""
          }
          title={t("profileStatusChanged")}
        />
        {/* handleCredentialSubmitButton() */}
        <CredentialsPopup
          showPopup={showCredentialPopup}
          hidePopup={() => setShowCredentialPopup(false)}
          submit={() => deleteSignedUser(afterdell)}
          credentials={credentials}
          setCredentials={setCredentials}
          hideDrawer={() => Setopendrawer(false)}
        />
        <ToastContainer position="top-center" autoClose={1000} />
        <AlertMessage
          showAlert={showAlert}
          hideAlert={() => setShowAlert(false)}
          confirmPressed={() => handleConfirmPressbtn()}
          title={alert.title}
          text={alert.text}
          errorType={alert.errorType}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonText={t("Close")}
        />
      </div>
    </div>
  );
};

export default Drawer;
