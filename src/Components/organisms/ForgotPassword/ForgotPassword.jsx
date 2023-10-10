import React, { useState } from "react";
import "../ForgotPassword/ForgotPassword.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import SapidLogo from "../../../Assets/Images/kindlogo.png";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../../Atoms/Button/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import AlertMessage from "../../Atoms/Dialog/AlertMessage";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [validationAlert, setValidationAlert] = useState({
    title: "",
    text: "",
    errorType: "",
  });

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const validationShowAlertMessage = (showAlert, errorType, title, text) => {
    setValidationAlert({
      ...validationAlert,
      title: title,
      text: text,
      errorType: errorType,
    });
    setShowValidationAlert(showAlert);
  };

  const handleResetPasswordFunc = () => {
    try {
      const emailRegEx =
        /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (emailRegEx.test(email)) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success(t("checkEmailResetPassword"));
            setTimeout(() => {
              // navigate(-1)
            }, 3000);
            setEmail("");
          })
          .catch((error) => {
            toast(error.message);
            console.log(
              error.conde,
              "erorr code",
              error.message,
              "error.message"
            );
          });
      } else {
        validationShowAlertMessage(
          true,
          "alert",
          t("Alert"),
          t("validEmailError")
        );
      }
    } catch (error) {
      // console.log(error, "this is the console of error inside try catch error");
    }
  };

  return (
    <div className="forgot_password_main_div">
      <div className="forgot_password_sub_main_div">
        <div className="back_icon_div">
          <ArrowBackIosNewIcon
            style={{ fontSize: "1.5rem", color: "#8C6766" }}
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="forgot_password_image_container_with_text">
          <div className="forgot_password_logo_div">
            <img
              src={SapidLogo}
              alt=""
              className="forgot_password_sapid_logo_css"
            />
          </div>
          <div className="for_passsword_css">{t("ForgetPassword")} </div>
        </div>
        <div className="forgot_password_instruction">
          {t("ForgetPasswordInstruction")}
        </div>
        <div className="forgot_password_input_field_outlined_main">
          <input
            type={"text"}
            placeholder={t("enterYourEmailPlaceholder")}
            className="forgot_password_input_field_css_outlined"
            value={email}
            onChange={(e) => handleOnChange(e)}
          />
          <CancelIcon
            style={{
              color: "darkgrey",
              fontSize: "medium",
              position: "absolute",
              bottom: 12,
              right: 8,
            }}
            onClick={() => setEmail("")}
          />
        </div>
        <div className="reset_password_btn_div">
          <Button
            text={t("resetPassword")}
            didPressButton={handleResetPasswordFunc}
          />
          <ToastContainer position="top-center" autoClose={1500} />
          <AlertMessage
            showAlert={showValidationAlert}
            hideAlert={() => setShowValidationAlert(false)}
            confirmPressed={() => setShowValidationAlert(false)}
            title={validationAlert.title}
            text={validationAlert.text}
            errorType={validationAlert.errorType}
            showCancelButton={false}
            showConfirmButton={true}
            confirmButtonText={t("Close")}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
