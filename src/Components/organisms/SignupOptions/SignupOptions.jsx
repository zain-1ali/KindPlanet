import React, { useContext, useEffect, useState } from "react";
import "../SignupOptions/SignupOptions.css";
import SapidLogo from "../../../Assets/Images/sapidtransparent.png";
import Button from "../../Atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../Services/Firebase/config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  ref as ref_database,
  set,
  update,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserLogin,
  loginUserObj,
  updateLanguage,
} from "../../../Redux/Login/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";
import {
  loginUserInfoSelector,
  updateSelectedLngSelector,
} from "../../../Redux/Login/selectors";
import enFlag from "../../../Assets/Icons/usa.png";
import spFlag from "../../../Assets/Icons/spain.png";
import { AppContext } from "../../../context/newContext";

const SignupOptions = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const loginUserData = useSelector(loginUserInfoSelector);
  const selectedLng = useSelector(updateSelectedLngSelector);
  const userId = auth?.currentUser?.uid;
  const dbRef = ref_database(getDatabase());

  let { sociallogin, setsociallogin } = useContext(AppContext);

  useEffect(() => {
    dispatch(updateLanguage(selectedLng));
    i18n?.changeLanguage(selectedLng);
  }, []);

  let [obgkey, setobjkey] = useState([]);

  useEffect(() => {
    get(child(dbRef, `User/`))
      .then((snapshot) => {
        // console.log(Object.keys(snapshot.val()))
        setobjkey(Object.keys(snapshot.val()));
        // console.log(obgkey)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSignUpGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response, "this is the console of response");
        localStorage.setItem("user_email", response.user.email);
        localStorage.setItem("provider", "Google");
        localStorage.setItem("email", response.user.email);
        localStorage.setItem("sapiduserid", response?.user?.uid);
        // console.log(obgkey)
        let result = obgkey.some((key) => {
          return key == response?.user?.uid;
        });
        if (!result) {
          set(ref_database(db, "User/" + response?.user?.uid), {
            address: "",
            bio: "",
            directMode: false,
            dob: "",
            email: response?.user?.email,
            fcmToken: "",
            gender: "",
            language: "es",
            links: "",
            id: response?.user?.uid,
            isDeleted: false,
            logoUrl: "",
            name: response?.user?.displayName,
            phone: "",
            platform: "web",
            profileOn: 1,
            profileUrl: response?.user?.photoURL,
            tagUid: "",
            timestamp: "",
            username: response?.user?.displayName,
          });
        }

        // response?.user?.photoURL
        dispatch(isUserLogin(response?.user));
        get(child(dbRef, `User/${userId}`)).then((response) => {
          toast(t("signUpWithGoogle"));
          setsociallogin(true);
          dispatch(loginUserObj(response.val()));
          navigate("/home");
        });
        // alert.show("Successfully Sign up")
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignUpApple = () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(
          result,
          "this is the cosnole of response of signup with apple"
        );
        localStorage.setItem("provider", "Apple");
        // The signed-in user info.
        const user = result.user;

        let myresult = obgkey.some((key) => {
          return key == result?.user?.uid;
        });
        if (!myresult) {
          localStorage.setItem("sapiduserid", result?.user?.uid);
          set(ref_database(db, "User/" + result?.user?.uid), {
            address: "",
            bio: "",
            directMode: false,
            dob: "",
            email: result?.user?.email,
            fcmToken: "",
            gender: "",
            language: "es",
            links: "",
            id: result?.user?.uid,
            isDeleted: false,
            logoUrl: "",
            name: result?.user?.displayName,
            phone: "",
            platform: "web",
            profileOn: 1,
            profileUrl: "",
            tagUid: "",
            timestamp: "",
            username: result?.user?.displayName,
          });
        }
        // result?.user?.photoURL
        dispatch(isUserLogin(result?.user));
        get(child(dbRef, `User/${userId}`)).then((response) => {
          toast(t("signUpWithApple"));
          setsociallogin(true);
          dispatch(loginUserObj(response.val()));
          navigate("/home");
        });

        // Apple credential
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

        // ...
      })
      .catch((error) => {
        console.log(error, "this is the console of apple login error");
        // Handle Errors here.
        // toast(error.message)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleSignUpFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider).then((response) => {
      console.log(response, "console of response");

      if (response) {
        const user = response.user;
        console.log(
          user,
          "login user",
          response,
          "console of login user response"
        );
        localStorage.setItem("provider", "Facebook");
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(response);
        const accessToken = credential.accessToken;
        console.log(response?.user?.photoURL);
        let result = obgkey.some((key) => {
          return key == response?.user?.uid;
        });
        if (!result) {
          localStorage.setItem("sapiduserid", response?.user?.uid);
          set(ref_database(db, "User/" + response?.user?.uid), {
            address: "",
            bio: "",
            directMode: false,
            dob: "",
            email: response?.user?.email,
            fcmToken: "",
            gender: "",
            links: "",
            id: response?.user?.uid,
            isDeleted: false,
            logoUrl: "",
            name: response?.user?.displayName,
            phone: "",
            language: "es",
            platform: "web",
            profileOn: 1,
            profileUrl: "",
            tagUid: "",
            timestamp: "",
            username: response?.user?.displayName,
          });
        }
        // response?.user?.photoURL
        dispatch(isUserLogin(response?.user));
        get(child(dbRef, `User/${userId}`)).then((response) => {
          toast.success(t("signUpWithFb"));
          setsociallogin(true);
          dispatch(loginUserObj(response.val()));
          navigate("/home");
        });
      }
    });
  };

  const handleChangeLanguageFunc = (selectedLang) => {
    i18n?.changeLanguage(selectedLang);
    dispatch(updateLanguage(selectedLang));
    localStorage.setItem("lang", selectedLang);
  };

  return (
    <div className="signup_options_main_div">
      <div className="signup_options_submain">
        <div className="main_Screen_change_language_switch_main">
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
              alignItems: "center",
              objectFit: "contain",
              cursor: "pointer",
              fontFamily: "MadeOuterSansLight, sans-serif",
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
        </div>
        <div className="image_container">
          <img src={SapidLogo} alt="" className="sapid_logo_css" />
        </div>
        <div className="lets_get_started_div">
          {t("letsGetConnected")} <br />
          {t("connected")}
        </div>
        <div className="buttons_main_div">
          <div
            style={{
              marginBottom: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              text={t("signUpWithEmail")}
              didPressButton={() => navigate("/signup")}
            />
          </div>
          <div
            style={{
              marginBottom: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              text={t("continueWithApple")}
              applieIcon={true}
              didPressButton={() => handleSignUpApple()}
            />
          </div>
          <div
            style={{
              marginBottom: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              text={t("continueWithGoogle")}
              googleIcon={true}
              bgwhite={true}
              didPressButton={() => handleSignUpGoogle()}
            />
            <ToastContainer position="top-center" autoClose={2000} />
          </div>
          <div
            style={{
              marginBottom: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              text={t("continueWithFB")}
              facebookIcon={true}
              bgwhite={true}
              didPressButton={() => handleSignUpFacebook()}
            />
          </div>
        </div>
        <div className="Already_have_account_div">
          {t("alreadyAccount")}
          <text
            className="Sign_in_text_css"
            onClick={() => navigate("/signin")}
          >
            {t("signIn")}
          </text>
        </div>
      </div>
    </div>
  );
};

export default SignupOptions;
