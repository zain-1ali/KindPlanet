import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import "../EditHome/EditHome.css";
import EditHomeCard from "../../molecules/EditHomeCard/EditHomeCard";
import SocialSites from "../../Atoms/SocialSites/SocialSites";
import SlideModal from "../../molecules/Slide/Slide";
import SocialSlider from "../../molecules/Slide/SocialSlider";
import Drawer from "../Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  allSocialLinksSelector,
  loginUserInfoSelector,
  updatedSocialLinksSelector,
  userLoginObjectSelector,
} from "../../../Redux/Login/selectors";
import { getDatabase, ref, child, get, update } from "firebase/database";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import BioSlide from "../../molecules/Slide/BioSlide";
import moment from "moment";
import { loginUserObj, updateSocialLinks } from "../../../Redux/Login/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  openSocialApp,
  returnAlreadyExistance,
} from "../../Services/utils/Utils";
import { app } from "../../../Components/Services/Firebase/config";
import { useNavigate } from "react-router-dom";
import InstructionsPopup from "../../Atoms/Dialog/InstructionsPopup";
import {
  ref as ref_storage,
  uploadBytes,
  getDownloadURL,
  getStorage,
  uploadString,
} from "firebase/storage";
import { ref as myref } from "firebase/storage";
import { Button, CircularProgress } from "@mui/material";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import CropImage from "../../Atoms/Dialog/CropImage";
import AlertMessage from "../../Atoms/Dialog/AlertMessage";
import { useTranslation } from "react-i18next";
import ChangePasswordSlider from "../../molecules/Slide/ChangePasswordSlider";
import ChangeEmailSlider from "../../molecules/Slide/ChangeEmailSlider";
import SwipeableViews from "react-swipeable-views";
import { AppContext } from "../../../context/newContext";

const EditHome = () => {
  const { t } = useTranslation();
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const dbRef = ref(getDatabase());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const startX = useRef(0);
  const socialLinks = useSelector(allSocialLinksSelector);
  const loginUserData = useSelector(loginUserInfoSelector);
  const linksForUpdate = useSelector(updatedSocialLinksSelector);
  const [showDOBSlide, setShowDOBSlide] = useState(false);
  const [showBioSlide, setShowBioSlide] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [data, setData] = useState();
  const [showChangePasswordSlider, setShowChangePasswordSlider] =
    useState(false);
  const [showChangeEmailSlider, setShowChangeEmailSlider] = useState(false);

  const [newEmail, setNewEmail] = useState("");

  const [resetPassword, setResetPassword] = useState({
    old_password: "",
    confirmPassword: "",
  });
  const [showSocialSlider, setShowSocialSlider] = useState({
    state: false,
    item: {},
  });
  const [inputData, setInputData] = useState("");
  const [showCropImageModal, setShowCropImageModal] = useState(false);
  const [src, selectFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [showLogoCropImage, setShowLogoCropImage] = useState(false);
  const [logoSrc, selectLogoFile] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [logoCrop, setLogoCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 50,
    y: 50,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    text: "",
    errorType: "",
  });
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [validationAlert, setValidationAlert] = useState({
    title: "",
    text: "",
    errorType: "",
  });
  let theprovider = localStorage.getItem("provider");

  // const options = { month: 'short', day: '2-digit', year: 'numeric' };
  // const formattedDate = new Date(editUserData?.date_of_birth?.$d).toLocaleDateString('en-US', options).replace('  ', ',');
  const [editUserData, setEditUserData] = useState({
    name: loginUserData?.name,
    bio: loginUserData?.bio,
    phone_number: loginUserData?.phone,
    location: loginUserData?.address,
    gender: loginUserData?.gender,
    profile_pic: loginUserData?.profileUrl,
    logo: loginUserData?.logoUrl,
    date_of_birth: loginUserData?.dob,
    // ? moment(loginUserData?.dob).format("DD.MM.YYYY")
    // : null,
  });

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `User/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(updateSocialLinks(snapshot.val().links));
          setNewEmail(snapshot.val().email);
        } else {
          // console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(dbRef, `User/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val(), "console of user table");
          dispatch(loginUserObj(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmitButton = () => {};

  const checkValidation = (data, value) => {
    if (data.name == "Whatsapp" || data?.name == "Phone") {
      const mobileRegex = /^(\+|00|\d{1,4})?(\d{7,14}|\d{1,5}\s?\d{6,12})$/;
      if (!mobileRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "Custom Link" || data?.name == "Website") {
      const linkRegex = new RegExp(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
      );
      if (!linkRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "Email") {
      const emailRegEx =
        /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (!emailRegEx.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "Facebook") {
      const facebookRegex =
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
      if (!facebookRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "Telegram") {
      const telegramRegex = /^(\+|00|\d{1,4})?(\d{7,14}|\d{1,5}\s?\d{6,12})$/;
      // /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      // /^((\+)|(00))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
      // /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/;
      if (!telegramRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "LinkedIn") {
      const linkedinRegex =
        /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/;
      if (!linkedinRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    }
    // else if (data?.name == "Reddit") {
    //   const redditRegex = /https:\/\/www\.reddit\.com\/user\//i;
    //   if (!redditRegex.test(value)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    else if (data?.name == "Paypal") {
      const payPalRegex = /https:\/\/www\.paypal\.com\//i;
      if (!payPalRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "Pinterest") {
      const pinterestRegex = /https:\/\/www\.pinterest\.com\//i;
      if (!pinterestRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "YouTube") {
      const youtubeRegex =
        /(https?:\/\/)?(www\.)?youtube\.com\/(channel|user)\/[\w-]+/;
      if (!youtubeRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (data?.name == "Vimeo") {
      const vimeoRegex = /https:\/\/vimeo\.com\//i;
      if (!vimeoRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    }
    // else if (data?.name == "Instagram") {
    //   const instaRegex = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm;
    //   if (!instaRegex.test(value)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    // else if (data?.name == "Snapchat") {

    //   const snapchatRegex = /^(?:https?:\/\/)?(?:www\.)?snapchat\.com\/add\/([A-Za-z0-9._-]+)\/?$/

    //   if (!snapchatRegex.test(value)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    // else if (data?.name == "TikTok") {

    //   const TikTokRegex = /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([A-Za-z0-9._-]+)(?:\?lang=en)?\/?$/

    //   if (!TikTokRegex.test(value)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    else if (data?.name == "Twitter") {
      const TwitterRegex = /^@?(\w){1,15}$/;
      if (!TwitterRegex.test(value)) {
        return false;
      } else {
        return true;
      }
    } else if (
      data?.name == "Spotify" ||
      data?.name == "Reddit" ||
      data?.name == "TikTok" ||
      data?.name == "Snapchat" ||
      data?.name == "Instagram"
    ) {
      return true;
    }
  };

  let [btnLoading, setbtnLoading] = useState(false);

  const handleSocialSliderSubmitButton = (data) => {
    if (!btnLoading) {
      setbtnLoading(true);
      if (checkValidation(data, inputData)) {
        const obj = {
          baseUrl: data?.baseUrl ? data.baseUrl : "",
          image: data.image ? data?.image : "",
          name: data.name,
          packageName: data.packageName ? data.packageName : "",
          value: inputData ? inputData : "",
          isShared: true,
        };
        const userId = auth?.currentUser?.uid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `User/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              // if (snapshot.val().links?.length == 0) {
              if (!snapshot.val().links) {
                update(ref(db, "User/" + userId), {
                  links: [obj],
                });
              } else {
                const result = snapshot
                  .val()
                  .links?.some((item) => item?.name == data.name);
                if (!result) {
                  let myLinks = [];
                  myLinks = snapshot.val().links;
                  myLinks?.push(obj);
                  update(ref(db, "User/" + userId), {
                    links: myLinks,
                  });
                } else {
                  const myLinks = snapshot.val().links;
                  const index = myLinks.findIndex((z) => z.name == data.name);
                  myLinks.splice(index, 1);
                  myLinks?.push(obj);
                  update(ref(db, "User/" + userId), {
                    links: myLinks,
                  });
                }
              }
              get(child(dbRef, `User/${userId}`)).then((response) => {
                dispatch(updateSocialLinks(response.val().links));
              });
              setTimeout(() => {
                setbtnLoading(false);
              }, 2000);
              toast.success(t("linkUpdatedAlert"));
              setShowSocialSlider(false);
            } else {
              // console.log("No data available");
            }
          })
          .catch((error) => {
            setTimeout(() => {
              setbtnLoading(false);
            }, 2000);
            console.error(error);
          });
      } else {
        if (data.name == "Whatsapp") {
          validationShowAlertMessage(
            true,
            "alrt",
            t("Alert"),
            t("invalidwhatsaap")
          );
        } else if (data?.name == "Phone") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidnumber")
          );
        } else if (data?.name == "Custom Link" || data?.name == "Website") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidLink")
          );
        } else if (data?.name == "Email") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("validEmailError")
          );
        } else if (data?.name == "Facebook") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidfbLink")
          );
        } else if (data?.name == "Telegram") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidtelegramLink")
          );
        } else if (data?.name == "LinkedIn") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidlinkedinLink")
          );
        } else if (data?.name == "Reddit") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidredditLink")
          );
        } else if (data?.name == "Pinterest") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidpinterestLink")
          );
        } else if (data?.name == "Paypal") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidpaypalLink")
          );
        } else if (data?.name == "Vimeo") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidvimeoLink")
          );
        } else if (data?.name == "YouTube") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidyoutubeLink")
          );
        } else if (data?.name == "Instagram") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidinstaLink")
          );
        } else if (data?.name == "Snapchat") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidsnapchatLink")
          );
        } else if (data?.name == "TikTok") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidTiktokLink")
          );
        } else if (data?.name == "Twitter") {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidtwitterLink")
          );
        }
        setTimeout(() => {
          setbtnLoading(false);
        }, 2000);
      }
    }
  };

  let [formatedate, setformatedate] = useState("");
  useEffect(() => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = new Date(editUserData?.date_of_birth?.$d)
      .toLocaleDateString("en-US", options)
      .replace("  ", ",");
    console.log(formattedDate);
    setformatedate(formattedDate);
  }, [editUserData?.date_of_birth]);

  // useEffect(() => {

  const showAlertMessage = (showAlert, errorType, title, text) => {
    setAlert({
      ...alert,
      title: title,
      text: text,
      errorType: errorType,
    });
    setShowAlert(showAlert);
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

  const handleOpenCalenderFunc = () => {
    setShowDOBSlide(true);
  };

  const handleBioSliderSubmitButton = () => {
    setShowBioSlide(false);
  };

  const handleSocialTextOnChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSaveButton = () => {
    if (editUserData.name != "") {
      const mobileRegex = /^(\+|00|\d{1,4})?(\d{7,14}|\d{1,5}\s?\d{6,12})$/;
      // /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
      if (editUserData?.phone_number != "") {
        if (mobileRegex.test(editUserData.phone_number)) {
          const userId = auth?.currentUser?.uid;
          update(ref(db, "User/" + userId), {
            address: editUserData?.location,
            bio: editUserData?.bio,
            // dob: formattedDate,
            // ? editUserData?.date_of_birth
            // : "",
            gender: editUserData?.gender,
            logoUrl: editUserData?.logo,
            name: editUserData?.name,
            phone: editUserData?.phone_number,
            profileUrl: editUserData?.profile_pic
              ? editUserData?.profile_pic
              : "",
          })
            .then(() => {
              toast.success(t("changesupdated"));
            })
            .catch((error) => {
              console.log(error);
            });
          const dbRef = ref(getDatabase());
          get(child(dbRef, `User/${userId}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                // toast.success(t("changesupdated"));
                console.log(snapshot.val());
                dispatch(loginUserObj(snapshot.val()));
                // toast.success(t("changesupdated"));
                setTimeout(navigate("/home"), 2000);
                // navigate('/home')
              } else {
                toast.error(t("nodata"));
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("invalidnumber")
          );
        }
      } else {
        const userId = auth?.currentUser?.uid;
        update(ref(db, "User/" + userId), {
          address: editUserData?.location,
          bio: editUserData?.bio,
          // dob: formattedDate,
          // ? (editUserData?.date_of_birth).format("MMM DD,YYYY")
          // : "",
          gender: editUserData?.gender,
          logoUrl: editUserData?.logo,
          name: editUserData?.name,
          phone: editUserData?.phone_number,
          profileUrl: editUserData?.profile_pic
            ? editUserData?.profile_pic
            : "",
        })
          .then(() => {
            toast.success(t("changesupdated"));
          })
          .catch((error) => {
            console.log(error);
          });
        const dbRef = ref(getDatabase());
        get(child(dbRef, `User/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              dispatch(loginUserObj(snapshot.val()));
              setTimeout(navigate("/home"), 2000);
            } else {
              toast.error(t("nodata"));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("allfieldsrequire")
      );
    }

    if (formatedate && formatedate != "Invalid Date") {
      const userId = auth?.currentUser?.uid;
      update(ref(db, "User/" + userId), { dob: formatedate });
      setformatedate("");
    }
  };

  const handleOpenAppFunc = (data) => {
    // console.log(data, 'this is the console of data')
    openSocialApp(data);
    // return (
    //   <a href="tel:" />
    // )
  };

  const openSocialSitesSlider = (item) => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `User/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(
            snapshot.val(),
            "this is snapshot.val() in open social slites"
          );
          setShowSocialSlider({
            ...showSocialSlider,
            status: true,
            item: item,
          });
          const result = snapshot
            .val()
            .links?.some((z) => z?.name == item?.name);
          if (result) {
            let val;
            snapshot.val().links?.map((value) => {
              if (item.name == value.name) {
                val = value?.value;
              }
            });
            setInputData(val);
          } else {
            setInputData("");
          }
        } else {
          // console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProfilePicOnChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
    setShowCropImageModal(true);
  };

  const handleLogoOnChange = (e) => {
    selectLogoFile(URL.createObjectURL(e.target.files[0]));
    setShowLogoCropImage(true);
  };

  const handleDeleteSocialLinkFunc = (data) => {
    setData(data);
    const exists = linksForUpdate?.some((item) => item?.name == data?.name);
    if (exists) {
      showAlertMessage(true, "alert", t("Alert"), t("sureDeleteLink"));
    } else {
      showAlertMessage(true, "warning", t("Alert"), t("unabletodelete"));
    }
  };

  const [userdata, setuserdata] = useState({});

  const getProfileCropImage = () => {
    setShowCropImageModal(false);
    setShowLoader(true);
    // let base64Image;
    // if (crop.width && crop.height) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    let base64Image = canvas.toDataURL("image/jpeg");
    // }
    // else {
    //   base64Image = src;
    // }
    // const base64Image2 = canvas.toDataURL(src);
    // console.log(base64Image.slice(23))
    const userId = auth?.currentUser?.uid;
    console.log(userId);
    const imgRef = ref_storage(storage, `profilePic:${userId}.jpg`);
    const dbRef = ref(getDatabase());
    // gs://sapid-21ca2.appspot.com
    var ProfilePic =
      "gs://kindplanet-2023.appspot.com/profilePic:" + userId + ".jpg";

    uploadString(imgRef, base64Image.slice(23), "base64", {
      contentType: "image/png",
    })
      .then((response) => {
        console.log(ProfilePic, response);
        if (userId && response?.metadata?.name == `profilePic:${userId}.jpg`) {
          // var ProfilePic = "gs://sapid-21ca2.appspot.com/Profile" + userId;
          // update(ref(db, "User/" + userId), {
          //   profileUrl: ProfilePic,
          // });
          // getDownloadURL(ref_storage(storage, `profilePic:${userId}.jpg`))
          // .then((url) => {
          setEditUserData({
            ...editUserData,
            profile_pic: ProfilePic,
          });
          update(ref(db, "User/" + userId), {
            profileUrl: ProfilePic,
          });
          get(child(dbRef, `User/${userId}`))
            .then((response) => {
              dispatch(loginUserObj(response?.val()));
            })
            .catch((error) => {
              setShowLoader(false);
            });
          setShowLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
      });
  };

  console.log(userdata);

  const handleAlertConfirmPressed = () => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `User/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const myLinks = snapshot.val().links;
        const result = snapshot
          .val()
          .links?.some((item) => item?.name == data?.name);
        if (result) {
          const index = myLinks.findIndex((z) => z.name == data.name);
          myLinks.splice(index, 1);
          update(ref(db, "User/" + userId), {
            links: myLinks,
          });
        }
        get(child(dbRef, `User/${userId}`)).then((response) => {
          dispatch(updateSocialLinks(response.val().links));
          if (response.val().direct?.name == data.name) {
            update(ref(db, "User/" + userId), {
              direct: {
                image: response.val().links["0"].image,
                name: response.val().links["0"].name,
                shareable: response.val().directMode,
                value: response.val().links["0"].value,
              },
            });
          }
        });
        setShowSocialSlider(false);
        setShowAlert(false);
        // toast("Changes updated Successfully")
      } else {
        setShowAlert(false);
        toast.error("No Links exists");
      }
    });
  };

  const getLogoCroppedImage = () => {
    setShowLogoCropImage(false);
    setShowLoader(true);
    const canvas = document.createElement("canvas");
    const scaleX = logoImage.naturalWidth / logoImage.width;
    const scaleY = logoImage.naturalHeight / logoImage.height;
    canvas.width = logoCrop.width;
    canvas.height = logoCrop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = logoCrop.width * pixelRatio;
    canvas.height = logoCrop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      logoImage,
      logoCrop.x * scaleX,
      logoCrop.y * scaleY,
      logoCrop.width * scaleX,
      logoCrop.height * scaleY,
      0,
      0,
      logoCrop.width,
      logoCrop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    const userId = auth?.currentUser?.uid;
    const imgRef = ref_storage(storage, `logoImg:${userId}.jpg`);
    const dbRef = ref(getDatabase());
    // gs://sapid-21ca2.appspot.com
    var logoPic = "gs://kindplanet-2023.appspot.com/logoImg:" + userId + ".jpg";
    console.log("testing logo", base64Image);
    uploadString(imgRef, base64Image.slice(23), "base64", {
      contentType: "image/png",
    })
      .then((response) => {
        if (response?.metadata?.name == `logoImg:${userId}.jpg`) {
          getDownloadURL(ref_storage(storage, `logoImg:${userId}.jpg`))
            .then((url) => {
              setEditUserData({
                ...editUserData,
                logo: logoPic,
              });
              update(ref(db, "User/" + userId), {
                logoUrl: logoPic,
              });
              get(child(dbRef, `User/${userId}`))
                .then((response) => {
                  dispatch(loginUserObj(response?.val()));
                })
                .catch((error) => {
                  setShowLoader(false);
                });
              setShowLoader(false);
            })
            .catch((error) => {
              setShowLoader(false);
            });
        }
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  let [confirmpass, setconfirmpass] = useState("");
  const changePasswordSliderTextOnChange = (e) => {
    const { name, value } = e.target;
    setResetPassword({ ...resetPassword, [name]: value });
  };
  let { sociallogin, setsociallogin } = useContext(AppContext);

  const handleChangePasswordSubmit = (password) => {
    if (
      password?.old_password === "" ||
      password?.confirmPassword === "" ||
      confirmpass === ""
    ) {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("makeSureFieldsFilled")
      );
    } else if (password?.confirmPassword?.length < 6) {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("passwordInstructions")
      );
    } else if (password?.confirmPassword != confirmpass) {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("cofirmpassword")
      );
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          var credentials = EmailAuthProvider.credential(
            user?.email,
            password?.old_password
          );
          reauthenticateWithCredential(user, credentials)
            .then(function () {
              updatePassword(user, password?.confirmPassword)
                .then(function () {
                  password.old_password = "";
                  password.confirmPassword = "";
                  validationShowAlertMessage(
                    true,
                    "success",
                    t("Success"),
                    t("passwordUpdated")
                  );
                })
                .catch(function (error) {
                  validationShowAlertMessage(
                    true,
                    "error",
                    t("Error"),
                    t("passwordNotUpdated")
                  );
                });
            })
            .catch(function (error) {
              validationShowAlertMessage(
                true,
                "error",
                t("Error"),
                t("oldPasswordIncorrect")
              );
            });
        }
      });
    }
  };

  const handleChangePasswordSubmit2 = (password) => {
    if (password?.confirmPassword === "" || confirmpass === "") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("makeSureFieldsFilled")
      );
    } else if (password?.confirmPassword?.length < 6) {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("passwordInstructions")
      );
    } else if (password?.confirmPassword != confirmpass) {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("cofirmpassword")
      );
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          // var credentials = EmailAuthProvider.credential(
          //   user?.email,
          //   password?.old_password
          // );

          // reauthenticateWithCredential(user, credentials).then(function () {
          //   updatePassword(user, password?.confirmPassword).then(function () {
          //     password.old_password = "";
          //     password.confirmPassword = "";
          //     validationShowAlertMessage(true, 'success', t("Success"), t("passwordUpdated"))

          //   }).catch(function (error) {
          //     validationShowAlertMessage(true, 'error', t("Error"), t("passwordNotUpdated"))
          //   });
          // })
          updatePassword(user, password?.confirmPassword)
            .then(() => {
              toast.success("Your password has been updated successfully.");
            })
            .catch(function (error) {
              console.log(error);
              validationShowAlertMessage(
                true,
                "error",
                t("Error"),
                t("oldPasswordIncorrect")
              );
            });
        }
      });
    }
  };

  const emailChangetextFieldOnChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleChangeEmailSubmit = (inputData) => {
    const emailRegEx =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (emailRegEx.test(newEmail)) {
      let usersArray = [];
      get(child(dbRef, `User`)).then((response) => {
        const users = response?.val();
        const exists = Object.values(users).some(
          (item) => item.email === inputData
        );
        if (exists) {
          validationShowAlertMessage(
            true,
            "alert",
            t("Alert"),
            t("emailAlreadyExists")
          );
        } else {
          const userId = auth?.currentUser?.uid;
          updateEmail(auth.currentUser, inputData).then(() => {
            update(ref(db, "User/" + userId), {
              email: inputData,
            });
            get(child(dbRef, `User/${userId}`)).then((response) => {
              dispatch(loginUserObj(response.val()));
            });
            toast.success(t("emailUpdatedSuccess"));
            setNewEmail("");
            setShowChangeEmailSlider(false);
          });
        }
      });
    } else {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("validEmailError")
      );
    }
  };

  const handleTouchStart = (event) => {
    console.log(event.touches, "console of even while starting");
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    console.log(event.touches, "console of even while moving");
    const currentX = event.touches[0].clientX;
    const deltaX = startX.current - currentX;
    if (deltaX > 50) {
      setOpen(false);
    }
  };
  // let filename = src.split('.').pop();
  let { Opendrawer, Setopendrawer } = useContext(AppContext);

  let provider = localStorage.getItem("provider");
  console.log(provider);

  // let actualSubmit = () => {
  //   if (provider === 'emailpass')

  let changepassCheck = () => {
    if (provider === "emailpass") {
      setShowChangePasswordSlider(true);
    } else if (provider === "Google") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("googlechangepasserr")
      );
    } else if (provider === "Facebook") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("fbchangepasserr")
      );
    } else if (provider === "Apple") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("applechangepasserr")
      );
    }
  };

  let changeemailCheck = () => {
    if (provider === "emailpass") {
      setShowChangeEmailSlider(true);
    } else if (provider === "Google") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("googlechangeemailerr")
      );
    } else if (provider === "Facebook") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("fbchangeemailerr")
      );
    } else if (provider === "Apple") {
      validationShowAlertMessage(
        true,
        "alert",
        t("Alert"),
        t("applechangeemailerr")
      );
    }
  };

  console.log(src);
  return (
    <div className="edit_home_main_div">
      <div
        className="edit_home_sub_main_div"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <CropImage
          showPopup={showCropImageModal}
          hidePopup={() => setShowCropImageModal(false)}
          pressCrop={() => getProfileCropImage()}
          src={src}
          setImage={setImage}
          crop={crop}
          setCrop={setCrop}
        />
        <CropImage
          showPopup={showLogoCropImage}
          hidePopup={() => setShowLogoCropImage(false)}
          pressCrop={() => getLogoCroppedImage()}
          src={logoSrc}
          setImage={setLogoImage}
          crop={logoCrop}
          setCrop={setLogoCrop}
        />
        {showLoader ? (
          <CircularProgress
            style={{ display: "flex", alignSelf: "center", height: "100%" }}
          />
        ) : (
          <div className="profile_card_and_social_sites_main">
            <div className="edit_home_card_componenet_main">
              <EditHomeCard
                ard
                rd
                showDrawerOnClick={() => setOpen(true)}
                handleDOBClickFunc={() => handleOpenCalenderFunc()}
                editUserData={editUserData}
                setEditUserData={setEditUserData}
                didPressBio={() => setShowBioSlide(true)}
                handleLogoOnChange={(e) => handleLogoOnChange(e)}
                handleProfilePicOnChange={(e) => handleProfilePicOnChange(e)}
              />
              <ToastContainer position="top-center" autoClose={1000} />
            </div>
            {/* <div className="change_password_Change_email_main_Div">
              <Button
                style={{
                  height: "2.4rem",
                  width: "10rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                
                  color: "#8C6766",
                  backgroundColor: "#fff",
                  border: "1px solid darkgray",
                  fontWeight: 500,
                  fontSize: "13px",
                  fontFamily: "MadeOuterSansLight, sans-serif",
                  zIndex: "2!important",
                  textTransform: "capitalize",
                }}
                onClick={() => changeemailCheck()}
              >
                {t("changeEmail")}
              </Button>
              <Button
                style={{
                  height: "2.4rem",
                  width: "10rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  
                  color: "#8C6766",
                  backgroundColor: "#fff",
                  border: "1px solid darkgray",
                  fontWeight: 500,
                  fontSize: "13px",
                  fontFamily: "MadeOuterSansLight, sans-serif",
                  zIndex: "2!important",
                  textTransform: "capitalize",
                }}
                onClick={() => changepassCheck()}
             
              >
                {t("changePassword")}
              </Button>
            </div> */}
            <div className="social_sites_mainn">
              {socialLinks &&
                socialLinks?.length > 0 &&
                socialLinks?.map((item) => {
                  return (
                    <div
                      className="edit_home_social_sites_main"
                      onClick={() => openSocialSitesSlider(item)}
                    >
                      <SocialSites
                        text={item?.name}
                        alreadyAssigned={true}
                        item={item}
                        links={linksForUpdate}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {!Boolean(showLoader) && (
          <div className="cancel_and_save_btn_main">
            <div className="Cancel__button" onClick={() => navigate("/home")}>
              {t("cancel")}
            </div>
            <div className="save__button" onClick={handleSaveButton}>
              {t("save")}
            </div>
            <SlideModal
              // showSlide={showDOBSlide}
              hideSlide={() => setShowDOBSlide(false)}
              submit={() => handleSubmitButton()}
            />
            <SocialSlider
              showSlide={showSocialSlider?.status}
              hideSlide={() => setShowSocialSlider(false)}
              data={showSocialSlider?.item}
              inputData={inputData}
              btnLoading={btnLoading}
              openAppFunc={(data) => handleOpenAppFunc(data)}
              socialSliderTextFieldOnChange={(e) => handleSocialTextOnChange(e)}
              submit={(data) => handleSocialSliderSubmitButton(data)}
              deleteSocialLink={(data) => handleDeleteSocialLinkFunc(data)}
              questionMarkPress={() => setShowInstructions(true)}
            />
            <BioSlide
              showSlide={showBioSlide}
              hideSlide={() => setShowBioSlide(false)}
              submit={() => handleBioSliderSubmitButton()}
              editUserData={editUserData}
              setEditUserData={setEditUserData}
            />
            <InstructionsPopup
              showPopup={showInstructions}
              hidePopup={() => setShowInstructions(false)}
              submit={() => setShowInstructions(false)}
              data={showSocialSlider?.item}
            />
            <ChangePasswordSlider
              showSlide={showChangePasswordSlider}
              hideSlide={() => setShowChangePasswordSlider(false)}
              password={resetPassword}
              setconfirmpass={setconfirmpass}
              confirmpass={confirmpass}
              submit={(inputData) => handleChangePasswordSubmit(inputData)}
              changePasswordSliderTextOnChange={(e) =>
                changePasswordSliderTextOnChange(e)
              }
            />
            <ChangeEmailSlider
              showSlide={showChangeEmailSlider}
              hideSlide={() => setShowChangeEmailSlider(false)}
              newEmail={newEmail}
              submit={(inputData) => handleChangeEmailSubmit(inputData)}
              changeEmailTextOnChange={(e) => emailChangetextFieldOnChange(e)}
            />
          </div>
        )}
        <div>
          <AlertMessage
            showAlert={showAlert}
            hideAlert={() => setShowAlert(false)}
            confirmPressed={() => handleAlertConfirmPressed()}
            title={alert.title}
            text={alert.text}
            errorType={alert.errorType}
            showCancelButton={false}
            showConfirmButton={true}
            confirmButtonText={t("confirm")}
          />
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
        {/* open */}
        {Opendrawer && (
          <div className="sideDrawer_main_div">
            <Drawer />

            {/* closedrawer={() => { return setOpen(false) }} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditHome;
