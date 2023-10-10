import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { PaperProps } from "@mui/material";
import { useTranslation } from "react-i18next";


const ChangeLanguagePopup = ({
  showPopup,
  hidePopup,
  submit
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={showPopup}
      onClose={hidePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ style: { borderRadius: 10 } }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          fontSize: "1.4rem",
          fontWeight: 500,
          maxWidth: '350px',
          color: "#07074E",
          fontFamily: 'MadeOuterSansLight, sans-serif'
        }}
        dividers
      >
        {t("selectLanguage")}
        <CloseIcon
          style={{ position: "absolute", right: "15px", top: "15px" }}
          onClick={hidePopup}
        />
      </DialogTitle>
      <Divider />
      <DialogActions>
        <Button
          style={{
            height: "20%",
            color: "white",
            width: "9rem",
            borderRadius: "20px",
            marginBottom: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#7665cf",
            marginTop: "1rem",
            textTransform: "capitalize",
            fontSize: "15px",
            fontFamily: 'MadeOuterSansLight, sans-serif'
          }}
          onClick={() => submit('en')}
        >
          {t("English")}
        </Button>
        <Button
          style={{
            height: "20%",
            color: "white",
            width: "9rem",
            borderRadius: "20px",
            marginBottom: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#7665cf",
            marginTop: "1rem",
            textTransform: "capitalize",
            fontSize: "15px",
            fontFamily: 'MadeOuterSansLight, sans-serif'
          }}
          onClick={() => submit("sp")}
        >
          {t("Spanish")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeLanguagePopup;
