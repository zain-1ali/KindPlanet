import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Divider } from "@mui/material";
import Cropper from "react-easy-crop";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useTranslation } from "react-i18next";

const CropImage = ({
  showPopup,
  hidePopup,
  pressCrop,
  src,
  setImage,
  crop,
  setCrop,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={showPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ style: { width: "300px" } }}
    >
      <DialogTitle
        divider
        style={{
          fontFamily: "MadeOuterSansLight, sans-serif",
          fontSize: "15px",
          fontWeight: 400,
        }}
      >
        {t("imageUploadInstruction")}
      </DialogTitle>
      <Divider style={{ marginTop: "-1rem", marginBottom: "1rem" }} />
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "lightgrey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          objectFit: "cover",
        }}
      >
        {src && (
          <ReactCrop
            crop={crop}
            onChange={(e) => setCrop(e)}
            style={{
              height: "250px",
              width: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              objectFit: "contain",
            }}
          >
            <img
              src={src}
              onLoad={(e) => setImage(e.target)}
              style={{ width: "100%", height: "100%" }}
            />
          </ReactCrop>
        )}
      </div>
      <DialogActions
        style={{
          display: "flex",
          alignItems: "center",
          height: "20%",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={hidePopup}
          style={{
            backgroundColor: "#8C6766",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "8px",
            width: "36%",
            height: "34px",
            fontSize: "12px",
            fontFamily: "MadeOuterSansLight, sans-serif",
          }}
        >
          {t("Close")}
        </Button>
        <Button
          onClick={pressCrop}
          style={{
            backgroundColor: "#8C6766",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "8px",
            width: "38%",
            height: "34px",
            fontSize: "12px",
            fontFamily: "MadeOuterSansLight, sans-serif",
          }}
        >
          {t("Select")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropImage;
