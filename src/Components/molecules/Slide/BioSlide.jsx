import React from "react";
import "../Slide/Slide.css";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WhatsappIcon from "../../../Assets/Icons/whatsapp.svg";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Dialog, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const BioSlide = ({
  showSlide,
  hideSlide,
  submit,
  editUserData,
  setEditUserData,
}) => {
  const { t } = useTranslation();
  return (
    // <Dialog open={showSlide} onClose={hideSlide}>
    <Slide
      in={showSlide}
      direction="up"
      timeout={{ appear: 500, enter: 500, exit: 500 }}
    >
      <div className="bio_slide_main_div">
        <div className="title_and_icon_main">
          <div>
            <h3
              style={{
                fontFamily: "MadeOuterSansLight, sans-serif",
                fontSize: "1.1rem",
                color: "#8C6766",
              }}
            >
              {t("aboutyourself")}
            </h3>
          </div>
          <div onClick={hideSlide}>
            <KeyboardArrowDownIcon
              style={{ position: "absolute", right: "20px", fontSize: "2rem" }}
            />
          </div>
        </div>
        <div className="bio_text_area_Css">
          <TextField
            autoFocus
            id="outlined-multiline-static"
            label={t("aboutyourself")}
            multiline
            name="bio"
            value={editUserData?.bio}
            rows={5}
            onChange={(e) =>
              setEditUserData({ ...editUserData, bio: e.target.value })
            }
            className="bioInputFIeld_css"
            //   defaultValue="Default Value"
            sx={{ width: "100%", borderWidth: "10px", color: "#8C6766" }}
          />
        </div>

        <div className="ef-button--container_save">
          <Button
            variant="contained"
            onClick={() => submit()}
            style={{
              backgroundColor: "#8C6766",
              borderRadius: "10px",
              width: "80%",
              marginTop: "1rem",
              fontFamily: "MadeOuterSansLight, sans-serif",
              fontSize: "13px",
            }}
          >
            {t("save")}
          </Button>
        </div>
      </div>
    </Slide>
    // </Dialog>
  );
};

export default BioSlide;
