import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider } from "@mui/material";
import { PaperProps } from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { useTranslation } from "react-i18next";

const ProfileSwitchPopup = ({
  showPopup,
  hidePopup,
  submit,
  text,
  title,
  homeScreen,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <Dialog
        open={showPopup}
        keepMounted
        onClose={hidePopup}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: { borderRadius: 15, width: homeScreen ? "330px" : "350px" },
        }}
      >
        {!homeScreen && (
          <DialogTitle
            style={{
              // width: "22rem",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#CF9C9C",
            }}
          >
            <TaskAltOutlinedIcon style={{ color: "white", fontSize: "3rem" }} />
          </DialogTitle>
        )}
        <Divider />
        <DialogTitle
          style={{
            display: "flex",
            alignSelf: "center",
            fontWeight: "500",
            color: "#8C6766",
            // width: '90%',
            textAlign: "center",
            fontWeight: homeScreen ? 600 : 500,
            fontFamily: "MadeOuterSansLight, sans-serif",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContentText
          id="alert-dialog-slide-description"
          style={{
            display: "flex",
            alignSelf: "center",
            fontWeight: "500",
            color: "#8C6766",
            width: "80%",
            textAlign: "center",
            fontSize: "15px",
            marginTop: "-15px",
            justifyContent: homeScreen ? "center" : "",
            fontFamily: "MadeOuterSansLight, sans-serif",
          }}
        >
          {text}
        </DialogContentText>
        <DialogActions
          style={{
            // width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <Button
            onClick={hidePopup}
            style={{
              height: "35px",
              color: "white",
              width: homeScreen ? "60%" : "80%",
              borderRadius: "8px",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#CF9C9C",
              textTransform: "capitalize",
              fontSize: "15px",
              fontFamily: "MadeOuterSansLight, sans-serif",
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileSwitchPopup;
