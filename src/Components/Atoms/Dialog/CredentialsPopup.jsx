import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PaperProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const CredentialsPopup = ({
  showPopup,
  hidePopup,
  submit,
  credentials,
  setCredentials,
  hideDrawer,
}) => {
  const { t } = useTranslation();
  const handleTextFieldOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  let submitbutton = () => {
    submit();
    hideDrawer();
  };
  return (
    <div>
      <Dialog
        open={showPopup}
        onClose={hidePopup}
        PaperProps={{
          style: { borderRadius: 5, width: "350px", height: "150px" },
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ display: "flex", justifyContent: "center", mt: 1 }}
        >
          <h2
            style={{
              fontFamily: "MadeOuterSansLight, sans-serif",
              fontSize: "1.5rem",
              color: "#8C6766",
            }}
          >
            {t("Alert")}
          </h2>
        </Typography>
        {/* <DialogContent > */}
        <Typography
          style={{
            fontFamily: "MadeOuterSansLight, sans-serif",
            fontSize: "1rem",
            color: "#8C6766",
          }}
          sx={{ display: "flex", justifyContent: "center", mt: 1 }}
        >
          {t("dywtdelete")}
        </Typography>
        {/* <DialogContentText style={{ fontFamily: 'MadeOuterSansLight, sans-serif', fontSize: '1rem' }}>
            Do you want to delete your account ?
          </DialogContentText> */}
        {/* <TextField
            autoFocus
            margin="dense"
            label={t("emailAddress")}
            name="email"
            type="email"
            value={credentials?.email}
            fullWidth
            variant="standard"
            onChange={(e) => handleTextFieldOnChange(e)}
            sx={{ fontFamily: 'MadeOuterSansLight, sans-serif' }}
          />
            <TextField
            margin="dense"
            label={t("Password")}
            type="password"
            name="password"
            value={credentials?.password}
            fullWidth
            variant="standard"
            onChange={(e) => handleTextFieldOnChange(e)}
            sx={{ fontFamily: 'MadeOuterSansLight, sans-serif' }}
            /> */}
        {/* </DialogContent> */}
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            width: "350px",
          }}
        >
          <Button
            style={{
              height: "35px",
              color: "white",
              width: "30%",
              borderRadius: "8px",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#8C6766",
              textTransform: "capitalize",
              fontSize: "15px",
              fontFamily: "MadeOuterSansLight, sans-serif",

              marginLeft: "5px",
            }}
            onClick={hidePopup}
          >
            {t("Cancel")}
          </Button>

          <Button
            style={{
              height: "35px",
              color: "white",
              width: "30%",
              borderRadius: "8px",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#8C6766",
              textTransform: "capitalize",
              fontSize: "15px",
              fontFamily: "MadeOuterSansLight, sans-serif",
              marginRight: "5px",
            }}
            onClick={() => submitbutton()}
          >
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CredentialsPopup;
