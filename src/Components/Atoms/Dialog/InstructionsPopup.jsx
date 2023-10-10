import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
// import { returnSocialInstructions } from '../../Services/utils/Utils';
import { useTranslation } from "react-i18next";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const InstructionsPopup = ({ showPopup, hidePopup, submit, data }) => {
  const { t } = useTranslation();

  const returnSocialInstructions = (item) => {
    if (item?.name == "Phone") {
      return (
        <div>
          {t("whatsappInstructions")}
        </div>
      );
    } else if (item?.name == "Whatsapp") {
      return (
        <div>
          {t("whatsappInstructions")}
        </div>
      );
    } else if (item?.name == "Custom Link") {
      return (
        <div>
          {t("customLinkInstruction")}
        </div>
      );
    } else if (item?.name == "Email") {
      return <div>{t("emailInstruction")}</div>;
    } else if (item?.name == "Facebook") {
      return (
        <div>
          {/* {t("facebookInstructions")}<br /> */}
          {t("faceBookInstructions1")}<br />
          {t("faceBookInstructions2")} <br />
          {t("faceBookInstructions3")} <br />
          {/* {t("faceBookInstructions4")}<br />
          {t("faceBookInstructions5")} <br />
          {t("faceBookInstructions6")} */}
        </div>
      );
    } else if (item?.name == "Instagram") {
      return (
        <div>
          {t("instagramInstruction1")} <br />
          {t("instagramInstruction2")} <br />
          {t("instagramInstruction3")} <br />
          {t("instagramInstruction4")}
        </div>
      );
    } else if (item?.name == "LinkedIn") {
      return (
        <div>
          {/* {t("instruction")} <br /> */}
          {t("linkedinInstruction1")}<br />
          {t("linkedinInstruction2")}<br />
          {t("linkedinInstruction3")}<br />
          {t("linkedinInstruction4")}<br />
          {t("linkedinInstruction5")}<br />
          {t("linkedinInstruction6")}<br />
        </div>
      );
    } else if (item?.name == "Paypal") {
      return (
        <div>
          {t("payPalInstruction1")} <br />
          {t("payPalInstruction2")} <br />
          {t("payPalInstruction3")} <br />
          {t("payPalInstruction4")}
        </div>
      );
    } else if (item?.name == "Pinterest") {
      return (
        <div>
          {t("pinterestInstruction1")} <br />
          {t("pinterestInstruction2")}
          <br />
          {t("pinterestInstruction3")}
          <br />
          {t("pinterestInstruction4")} <br />
          {t("pinterestInstruction5")}
        </div>
      );
    } else if (item?.name == "Reddit") {
      return (
        <div>
          {t("redditInstruction1")} <br />
          {t("redditInstruction2")} <br />
          {t("redditInstruction3")} <br />
          {t("redditInstruction4")}
        </div>
      );
    } else if (item?.name == "Snapchat") {
      return (
        <div>
          {t("snapchatInstruction1")} <br />
          {t("snapchatInstruction2")}
          <br />
          {t("snapchatInstruction3")} <br />
          {t("snapchatInstruction4")}
        </div>
      );
    } else if (item?.name == "Spotify") {
      return (
        <div>
          {t("spotifyInstruction1")} <br />
          {t("spotifyInstruction2")} <br />
          {t("spotifyInstruction3")} <br />
          {t("spotifyInstruction4")}
        </div>
      );
    } else if (item?.name == "Telegram") {
      return (
        <div>
          {t("whatsappInstructions")}
        </div>
      );
    } else if (item?.name == "TikTok") {
      return (
        <div>
          {t("tiktokInstruction1")}
          <br />
          {t("tiktokInstruction2")}
          <br />
          {t("tiktokInstruction3")}
          <br />
          {t("tiktokInstruction4")}
        </div>
      );
    } else if (item?.name == "Twitter") {
      return (
        <div>
          {t("twitterInstruction1")}
          {/* <br />
          {t("twitterInstruction2")}
          <br />
          {t("twitterInstruction3")}
          <br />
          {t("twitterInstruction4")} */}
        </div>
      );
    } else if (item?.name == "Vimeo") {
      return (
        <div>
          {t("vimeoInstruction1")}
          <br />
          {t("vimeoInstruction2")}
          <br />
          {t("vimeoInstruction3")}
          <br />
          {t("vimeoInstruction4")}
        </div>
      );
    } else if (item?.name == "Website") {
      return (
        <div>
          {t("customLinkInstruction")}
        </div>
      );
    } else if (item?.name == "YouTube") {
      return (
        <div>
          {t("youtubeInstruction1")}
          <br />
          {t("youtubeInstruction2")}
          <br />
          {t("youtubeInstruction3")}
          <br />
          {t("youtubeInstruction4")}
        </div>
      );
    }
  };
  return (
    <Dialog
      open={showPopup}
      TransitionComponent={Transition}
      keepMounted
      onClose={hidePopup}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{ style: { borderRadius: 10, maxWidth: '350px' } }}
    >
      <DialogTitle style={{ maxWidth: '350px', fontFamily: 'MadeOuterSansLight, sans-serif' }}>{t("instruction")}</DialogTitle>
      <DialogContent style={{ width: '90%', color: 'black', fontFamily: 'MadeOuterSansLight, sans-serif' }}>
        {returnSocialInstructions(data)}
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} style={{ color: 'black', textTransform: 'capitalize', fontFamily: 'MadeOuterSansLight, sans-serif' }}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InstructionsPopup