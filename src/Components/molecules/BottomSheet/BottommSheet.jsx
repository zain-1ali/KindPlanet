import React from "react";
import "../BottomSheet/BottomSheet.css";
import { Dialog, Tooltip } from "@mui/material";
import Slide from "@mui/material/Slide";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { useTranslation } from "react-i18next";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const BottommSheet = ({ showSheet, hideSheet }) => {
  const { t } = useTranslation();
  let quote = "Share";
  // t("sharetext");
  let url = "http://google.com";

  return (
    <Dialog open={showSheet} onClose={hideSheet}>
      <Slide
        in={showSheet}
        direction="up"
        timeout={{ appear: 500, enter: 500, exit: 500 }}
        style={{
          marginBottom: "2rem",
          width: "330px",
          display: "flex",
          alignSelf: "center",
        }}
      >
        <div className="bottomSheet_main_div">
          <div className="share_to_text">{t("shareto")}</div>
          <div className="social_sites_single_main_div">
            <Tooltip title="Copy to Clipboard" placement="top-start">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ContentCopyIcon
                  // className='text-[45px] cursor-pointer active:text-[#0b567f] active:text-[40px]'
                  sx={{
                    cursor: "pointer",
                    height: "30px",
                    width: "30px",
                    marginTop: "8px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                  }}
                />
                {/* <div className='text-[10px]'>Copy url</div> */}
              </div>
            </Tooltip>
            <label className="social_labels_name" style={{ marginTop: "5px" }}>
              Copy url
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <WhatsappShareButton
              id="whatsapp"
              url={quote + "\n" + url}
              text={"Please find my Profile Link below:"}
              hashtag="#React"
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <label htmlFor="whatsapp" className="social_labels_name">
              Whatsapp
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <FacebookShareButton
              id="facebook"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <label htmlFor="facebook" className="social_labels_name">
              Facebook
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <FacebookMessengerShareButton
              id="fbMessenger"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <FacebookMessengerIcon size={40} round={true} />
            </FacebookMessengerShareButton>
            <label htmlFor="fbMessenger" className="social_labels_name">
              Messenger
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <TwitterShareButton
              id="twitter"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <label htmlFor="twitter" className="social_labels_name">
              Twitter
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <TelegramShareButton
              id="telegram"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <TelegramIcon size={40} round={true} />
            </TelegramShareButton>
            <label htmlFor="telegram" className="social_labels_name">
              Telegram
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <LinkedinShareButton
              id="linkedin"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
            <label htmlFor="linkedin" className="social_labels_name">
              Linkedin
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <EmailShareButton
              id="Email"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
            <label htmlFor="Email" className="social_labels_name">
              Email
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <PinterestShareButton
              id="pinterest"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <PinterestIcon size={40} round={true} />
            </PinterestShareButton>
            <label htmlFor="pinterest" className="social_labels_name">
              Pinterest
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <RedditShareButton
              id="reddit"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <RedditIcon size={40} round={true} />
            </RedditShareButton>
            <label htmlFor="reddit" className="social_labels_name">
              Reddit
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <ViberShareButton
              id="Viber"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <ViberIcon size={40} round={true} />
            </ViberShareButton>
            <label htmlFor="Viber" className="social_labels_name">
              Viber
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <InstapaperShareButton
              id="Instapaper"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <InstapaperIcon size={40} round={true} />
            </InstapaperShareButton>
            <label htmlFor="Instapaper" className="social_labels_name">
              Instapaper
            </label>
          </div>
          <div className="social_sites_single_main_div">
            <LineShareButton
              id="Line"
              url={quote + "\n" + url}
              text={quote}
              hashtag="#React"
            >
              <LineIcon size={40} round={true} />
            </LineShareButton>
            <label htmlFor="Line" className="social_labels_name">
              Line
            </label>
          </div>
        </div>
      </Slide>
    </Dialog>
  );
};

export default BottommSheet;
