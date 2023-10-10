import React from "react";
import "../Slide/Slide.css";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { Dialog, TextField } from "@mui/material";
import SapidLogo from "../../../Assets/Images/kindlogo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { child, get } from "firebase/database";

const ChangeEmailSlider = ({
  showSlide,
  Setopendrawer,
  hideSlide,
  submit,
  changeEmailTextOnChange,
  newEmail,
}) => {
  const { t } = useTranslation();
  // useEffect(() => {
  //   Setopendrawer();
  // }, []);

  // const [newEmail, setNewEmail] = useState("");

  // const emailChangetextFieldOnChange = (e) => {
  //   setNewEmail(e.target.value);
  // };

  // const handleChangeEmailSubmit = (inputData) => {
  //   const emailRegEx =
  //     /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  //   if (emailRegEx.test(newEmail)) {
  //     let usersArray = [];
  //     get(child(dbRef, `User`)).then((response) => {
  //       const users = response?.val();
  //       const exists = Object.values(users).some(
  //         (item) => item.email === inputData
  //       );
  //       if (exists) {
  //         validationShowAlertMessage(
  //           true,
  //           "alert",
  //           t("Alert"),
  //           t("emailAlreadyExists")
  //         );
  //       } else {
  //         const userId = auth?.currentUser?.uid;
  //         updateEmail(auth.currentUser, inputData).then(() => {
  //           update(ref(db, "User/" + userId), {
  //             email: inputData,
  //           });
  //           get(child(dbRef, `User/${userId}`)).then((response) => {
  //             dispatch(loginUserObj(response.val()));
  //           });
  //           toast.success(t("emailUpdatedSuccess"));
  //           setNewEmail("");
  //           setShowChangeEmailSlider(false);
  //         });
  //       }
  //     });
  //   } else {
  //     validationShowAlertMessage(
  //       true,
  //       "alert",
  //       t("Alert"),
  //       t("validEmailError")
  //     );
  //   }
  // };

  return (
    // <Dialog open={showSlide} onClose={hideSlide}>
    <Slide
      in={showSlide}
      direction="up"
      timeout={{ appear: 500, enter: 500, exit: 500 }}
      // style={{   backgroundColor: "rgba(255, 255, 255, 0.4)", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
    >
      <div className="change_emailll_slide_main_div">
        <div className="change_password_title_and_icon_main">
          <div onClick={hideSlide}>
            <KeyboardArrowDownIcon
              style={{ position: "absolute", right: "20px", fontSize: "2rem" }}
            />
          </div>
        </div>
        <div className="change_password_Sapid_logo_main">
          <img src={SapidLogo} className="change_password_sapid_logo_css" />
        </div>
        <div className="reset_password_div">{t("enterNewEmail")}</div>
        <div className="change_password_text_field">
          <TextField
            label={t("Email")}
            variant="outlined"
            value={newEmail}
            sx={{ boxShadow: 3, backgroundColor: "#fff", color: "#8C6766" }}
            style={{ height: "100%", width: "83%", color: "#8C6766" }}
            size="small"
            className="change_emaill_input_field_css"
            onChange={(e) => changeEmailTextOnChange(e)}
          />
        </div>
        <div className="change_password_save_button">
          <Button
            variant="contained"
            onClick={() => submit(newEmail)}
            style={{
              backgroundColor: "#8C6766",
              borderRadius: "10px",
              width: "85%",
              marginTop: "1rem",
              height: "2.5rem",
              fontFamily: "MadeOuterSansLight, sans-serif",
            }}
          >
            {t("Confirm")}
          </Button>
        </div>
      </div>
    </Slide>
    // </Dialog>
  );
};

export default ChangeEmailSlider;
