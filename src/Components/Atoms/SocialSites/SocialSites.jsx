import React from "react";
import "../SocialSites/SocialSites.css";
import TickIcon from "../../../Assets/Icons/check.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { returnSocialImages } from "../../Services/utils/Utils";
import { useTranslation } from "react-i18next";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SocialSites = ({ text, alreadyAssigned, item, links }) => {
  // console.log(text)

  const { t } = useTranslation();
  let returnName = (name) => {
    if (name) {
      if (name === "Phone") {
        return t("phone");
      } else if (name === "Website") {
        return t("website");
      } else if (name === "Custom Link") {
        return t("cstmLink");
      } else {
        return name;
      }
    }
  };
  return (
    <div className="social_sites_logo_main" style={{ cursor: "pointer" }}>
      <div className="social_sites_logo_div">{returnSocialImages(item)}</div>
      <div className="social_site_text_css">{returnName(text)}</div>
      <div className="already_added_identifier_main">
        {alreadyAssigned &&
          links?.length > 0 &&
          links &&
          links?.map((value) => {
            return (
              <>
                {value?.name == text && (
                  // <img src={TickIcon} alt="" className="tick_icon_class" />
                  <CheckCircleIcon sx={{ color: "#CF9C9C" }} />
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default SocialSites;
