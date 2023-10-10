import React, { useContext, useEffect, useRef, useState } from "react";
import "../Home/Home.css";
import MenuIcon from "@mui/icons-material/Menu";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Switch from "@mui/material/Switch";
import SocialSites from "../../Atoms/SocialSites/SocialSites";
import AddMore from "../../Atoms/SocialSites/AddMore";
import Drawer from "../Drawer/Drawer";
import { useNavigate, useLocation } from "react-router-dom";
import WhatsappLogo from "../../../Assets/Icons/whatsapp.svg";
import { db, storage } from "../../Services/Firebase/config";
import { useSelector } from "react-redux";
import { getStorage, ref as storagref, getDownloadURL } from "firebase/storage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  loginUserInfoSelector,
  userLoginObjectSelector,
} from "../../../Redux/Login/selectors";
import { updateProfile } from "firebase/auth";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  onValue,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import BioSlide from "../../molecules/Slide/BioSlide";
import { loginUserInfo } from "../../../Redux/Login/selectors";
import { useDispatch } from "react-redux";
import {
  allSocialLinks,
  loginUserObj,
  updateSocialLinks,
} from "../../../Redux/Login/actions";
import SocialSlider from "../../molecules/Slide/SocialSlider";
import { openSocialApp } from "../../Services/utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import InstructionsPopup from "../../Atoms/Dialog/InstructionsPopup";
import { useTranslation } from "react-i18next";
import ProfileSwitchPopup from "../../Atoms/Dialog/ProfileSwitchPopup";
import ProfileLogo11 from "../../../Assets/Icons/profileLogo11.svg";
import { AppContext } from "../../../context/newContext";
import LoadingScreen from "../../../Screens/LoadingScreen/LoadingScreen";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { returnSocialImages2 } from "../../Services/utils/Utils";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const label = { inputProps: { "aria-label": "Switch demo" } };
const Home = () => {
  const { t } = useTranslation();
  const auth = getAuth();

  const startX = useRef(0);
  const params = useLocation();
  const dispatch = useDispatch();
  const [showSwitchPopup, setShowSwitchPopup] = useState(false);
  const [selected, setSelected] = useState();
  let [direct, setdirect] = useState(false);
  const loginUserCompleteDetailsfromFirebase = useSelector(
    userLoginObjectSelector
  );
  const loginUserData = useSelector(loginUserInfoSelector);

  // console.log(
  //   loginUserData,
  //   "this is the console of user login data coming from redux store"
  // );
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [inputData, setInputData] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [showSocialSlider, setShowSocialSlider] = useState({
    status: false,
    item: {},
  });
  const [items, setItems] = useState([]);
  let userid = localStorage.getItem("sapiduserid");
  // useEffect(() => {
  //   const userId = auth?.currentUser?.uid;
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `User/${userId}/links`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         setItems(data);
  //       } else {
  //         console.log("No links available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  useEffect(() => {
    // const userId = auth?.currentUser?.uid;
    // console.log(userId);
    let getingdata = async () => {
      const starCountRef = ref(db, `User/${userid}/links`);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        setItems(data);

        // MediaKeyStatusMap
      });
    };

    getingdata();
  }, []);

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `User/${userid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val(), "console of user table");
          // let data = snapshot.val();
          // setItems(data?.links);

          dispatch(loginUserObj(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(dbRef, "AllLinks"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const links = [];
          snapshot.forEach((item) => {
            links.push(item?.val());
          });

          dispatch(allSocialLinks(links));

          // useEffect(() => {
          //   setItems(loginUserData?.links);
          // }, [loginUserData?.links]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(items);
  const handleOpenAppFunc = (data) => {
    openSocialApp(data);
  };

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
    // else if (data?.name == "Twitter") {

    //   const TwitterRegex = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/([A-Za-z0-9._]+)(?:\?lang=en)?\/?$/
    //   if (!TwitterRegex.test(value)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
    else if (
      data?.name == "Instagram" ||
      data?.name == "Snapchat" ||
      data?.name == "Spotify" ||
      data?.name == "TikTok" ||
      data?.name == "Twitter" ||
      // data?.name == "Facebook" ||
      // data?.name == "Telegram" ||
      // data?.name == "Vimeo" ||
      // data?.name == "YouTube" ||
      // data?.name == "Pinterest" ||
      // data?.name == "Paypal" ||
      data?.name == "Reddit"
      // data?.name == "LinkedIn"
    ) {
      return true;
    }
  };

  const handleSocialSliderSubmitButton = (data) => {
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
            const myLinks = snapshot.val().links;
            const index = myLinks.findIndex((z) => z.name == data.name);
            myLinks.splice(index, 1);
            myLinks?.push(obj);
            update(ref(db, "User/" + userId), {
              links: myLinks,
            });
            toast.success(t("changesupdated"));
            setShowSocialSlider(false);
          }

          // console.log("No data available");
          // }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      if (data.name == "Whatsapp") {
        // validationShowAlertMessage(
        //   true,
        //   "alrt",
        //   t("Alert"),
        toast.error(t("invalidwhatsaap"));

        // );
      } else if (data?.name == "Phone") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidnumber"));

        // );
      } else if (data?.name == "Custom Link" || data?.name == "Website") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidLink"));

        // );
      } else if (data?.name == "Email") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("validEmailError"));

        // );
      } else if (data?.name == "Facebook") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidfbLink"));

        // );
      } else if (data?.name == "Telegram") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidtelegramLink"));

        // );
      } else if (data?.name == "LinkedIn") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidlinkedinLink"));

        // );
      } else if (data?.name == "Reddit") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidredditLink"));

        // );
      } else if (data?.name == "Pinterest") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidpinterestLink"));

        // );
      } else if (data?.name == "Paypal") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidpaypalLink"));

        // );
      } else if (data?.name == "Vimeo") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidvimeoLink"));

        // );
      } else if (data?.name == "YouTube") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidyoutubeLink"));

        // );
      } else if (data?.name == "Instagram") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidinstaLink"));

        // );
      } else if (data?.name == "Snapchat") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidsnapchatLink"));

        // );
      } else if (data?.name == "TikTok") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidTiktokLink"));

        // );
      } else if (data?.name == "Twitter") {
        // validationShowAlertMessage(
        //   true,
        //   "alert",
        //   t("Alert"),
        toast.error(t("invalidtwitterLink"));

        // );
      }
    }
  };

  const socialSliderTextFieldOnChange = (e) => {
    setInputData(e.target.value);
  };

  const handleOpenSliderFunc = async (item) => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    if (direct) {
      setSelected(item?.name);
      const object = {
        image: item.image,
        name: item.name,
        shareable: toggleSwitch ? toggleSwitch : !toggleSwitch,
        value: item?.value,
      };
      update(ref(db, "User/" + userId), {
        direct: object,
      });
      await get(child(dbRef, `User/${userId}`))
        .then((snapshot) => {
          console.log(snapshot.val(), "console of single user");
          if (snapshot.exists()) {
            dispatch(loginUserObj(snapshot.val()));
          } else {
            // console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowSocialSlider({ ...showSocialSlider, status: true, item: item });

      await get(child(dbRef, `User/${userId}/links`))
        .then((snapshot) => {
          let linksData = Object.values(snapshot.val());
          linksData?.map((elm) => {
            if (elm.name === item?.name) {
              setInputData(elm?.value);
            }
          });
          console.log(Object.values(snapshot.val()));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeleteSocialLinkFunc = (data) => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `User/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const myLinks = snapshot.val().links;
        const result = snapshot
          .val()
          .links?.some((item) => item?.name == data.name);
        // const result2 = snapshot.val().direct.name?.some((item) => item == data.name);
        if (result) {
          const index = myLinks.findIndex((z) => z.name == data.name);
          myLinks.splice(index, 1);
          update(ref(db, "User/" + userId), {
            links: myLinks,
          });
        }
        console.log(snapshot.val().links["0"].image);
        if (snapshot.val().direct?.name == data.name) {
          update(ref(db, "User/" + userId), {
            direct: {
              image: snapshot.val().links["0"].image,
              name: snapshot.val().links["0"].name,
              shareable: snapshot.val().directMode,
              value: snapshot.val().links["0"].value,
            },
          });
        }
        get(child(dbRef, `User/${userId}`)).then((response) => {
          // console.log(response.val(), 'this is the console of response of user')
          // dispatch(updateSocialLinks(response.val().links));
          dispatch(loginUserObj(response.val()));
        });
        setShowSocialSlider(false);
        toast.success(t("changesupdated"));
      } else {
        toast.error(t("nodata"));
      }
    });
  };

  const handleSwitchOnChange = (e) => {
    // console.log(e.target.checked, 'this is the switch value')
    const switchValue = e.target.checked;
    setToggleSwitch(!toggleSwitch);
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    update(ref(db, "User/" + userId), {
      directMode: switchValue,
    });

    get(child(dbRef, `User/${userId}`))
      .then((snapshot) => {
        // console.log(snapshot.val(), 'console for directmode')
        if (snapshot.exists()) {
          update(ref(db, "User/" + userId), {
            direct: {
              image: snapshot.val().links["0"].image,
              name: snapshot.val().links["0"].name,
              shareable: snapshot.val().directMode,
              value: snapshot.val().links["0"].value,
            },
          });
        } else {
          // console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const infoFunction = () => {
    setShowSwitchPopup(true);
  };

  const handleTouchStart = (event) => {
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    const deltaX = startX.current - currentX;
    if (deltaX > 50) {
      setShowDrawer(false);
    }
  };

  // const storage = getStorage();

  // const [profileurl, setprofileurl] = useState('')
  // const storageRef = storagref(storage, loginUserData?.profileUrl)
  // getDownloadURL(storageRef).then((URL) => {
  //   console.log(URL)
  //   setprofileurl(URL)

  // }).catch((error) => {
  //   console.log(error)
  // });

  // console.log(newprofile)

  let { Opendrawer, Setopendrawer } = useContext(AppContext);

  let [imgurl, setimgurl] = useState("");

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `User/${userid}`))
      .then((snapshot) => {
        // console.log(snapshot.val(), 'console for directmode')
        if (snapshot.exists()) {
          setdirect(snapshot.val()?.directMode);
          setSelected(snapshot.val()?.direct?.name);
          // setimgurl(snapshot.val().profileUrl)
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [handleSwitchOnChange]);

  // console.log(selected);

  const [profileurl, setprofileurl] = useState("");

  // let profilestring = loginUserData?.profileUrl?.slice(0, 10)
  // console.log(profilestring)

  useEffect(() => {
    // let theprovider2 = localStorage.getItem("provider")
    let profilestring = loginUserData?.profileUrl?.slice(0, 10);

    if (profilestring === "gs://kindp") {
      if (loginUserData?.profileUrl) {
        const storage = getStorage();
        const fileRef = storagref(storage, loginUserData?.profileUrl);
        console.log(loginUserData.profileUrl);

        getDownloadURL(fileRef)
          .then((URL) => {
            console.log(URL);
            setprofileurl(URL);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setprofileurl(loginUserData?.profileUrl);
    }
  }, []);

  // useEffect(() => {
  //   if (loginUserData?.profileUrl) {
  //     const storage = getStorage();

  //     const storageRef = storagref(storage, loginUserData?.profileUrl)
  //     getDownloadURL(storageRef).then((URL) => {
  //       console.log(URL)
  //       setprofileurl(URL)

  //     }).catch((error) => {
  //       console.log(error)
  //     });
  //   }
  // }, [])

  // ------------------------------------------------Dragable functonality------------------------------------------

  // useEffect(() => {
  //   const userId = auth?.currentUser?.uid;
  //   let getingdata = async () => {
  //     const starCountRef = ref(db, `User/${userId}`);
  //     onValue(starCountRef, async (snapshot) => {
  //       const data = await snapshot.val();
  //       setItems(data?.links);
  //     });
  //   };
  //   getingdata();
  // }, []);

  // useEffect(() => {
  //   setItems(loginUserData?.links);
  // }, [loginUserData?.links]);
  const handleDragEnd2 = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    // dispatch(Addlinks(updatedItems))
    setItems(updatedItems);
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.name === active.id);
        const overIndex = items.findIndex((item) => item.name === over.id);
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(activeIndex, 1);
        updatedItems.splice(overIndex, 0, movedItem);
        // set(ref(db, `User/${loginUserData?.id}/links/`), [
        //   ...updatedItems,
        // ]).then(() => {
        //   console.log("updated in db");
        // });
        return updatedItems;
      });
    }
  }

  console.log(items);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer?.getData("text/plain"));
    const newItems = [...items];
    const [movedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);
    setItems(newItems);
  };

  const handleTouchStart2 = (e, index) => {
    e.preventDefault();
    const touchIndex = index;
    e.target.setAttribute("data-touchindex", touchIndex);
  };

  const handleTouchMove2 = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e, targetIndex) => {
    const sourceIndex = parseInt(e.target.getAttribute("data-touchindex"), 10);
    if (!isNaN(sourceIndex)) {
      handleDrop(e, targetIndex);
      e.target.removeAttribute("data-touchindex");
    }
  };

  let SortableItem = ({ id, btnName, togle }) => {
    useEffect(() => {
      set(ref(db, `User/${loginUserData?.id}/links/`), items).then(() => {
        console.log("updated in db");
      });
    }, [items]);

    let handleHidelLink = (title, value) => {
      // Find the index of the object with the given ID
      const objectIndex = items?.findIndex((obj) => obj.name === title);

      // Check if the object exists
      if (objectIndex !== -1) {
        // Create a copy of the object
        const updatedObject = { ...items[objectIndex] };

        // Update the value of the desired property
        updatedObject.isShared = !value;

        // Create a new array with the updated object
        const updatedArray = [...items];
        updatedArray[objectIndex] = updatedObject;
        set(ref(db, `User/${loginUserData?.id}/links/`), [...updatedArray]);
      }
    };

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
      <>
        <div className="icon-img-div">
          <DragIndicatorIcon className="dragicon" />

          {returnSocialImages2(id)}
          <p className="socialname">{returnName(id?.name)}</p>
        </div>
        {togle && (
          <div className="theswitch">
            <div className="editbtn" onClick={() => handleOpenSliderFunc(id)}>
              {/* {btnName}
               */}
              {t("edit")}
            </div>

            <Switch
              // color="default"
              sx={{ color: "black" }}
              checked={id?.hasOwnProperty("isShared") ? id?.isShared : true}
              onChange={() => handleHidelLink(id?.name, id?.isShared)}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="home_main_div">
      <div
        className="home_sub_main_div"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="home_profile_card"
          onClick={() => navigate("/edit/home")}
        >
          <div className="profile_pc_main">
            <div
              className="profile_picture_div"
              style={{
                border: !loginUserData?.profileUrl ? "" : "2px solid #8C6766",
              }}
            >
              {profileurl ? (
                <img
                  src={profileurl}
                  alt=""
                  className="firebase_photo_url_css"
                />
              ) : (
                <img
                  src={ProfileLogo11}
                  alt=""
                  className="firebase_photo_url_css"
                />
              )}
            </div>
          </div>
          <div className="a3_title_div">{loginUserData?.name}</div>
          <div className="a3_sub_title_div">{loginUserData?.username}</div>
          <div className="email_main_div">{loginUserData?.email}</div>
        </div>
        <div>
          <MenuIcon
            style={{
              color: "white",
              position: "absolute",
              top: "30px",
              left: "30px",
              fontSize: "2rem",
              cursor: "pointer",
            }}
            onClick={() => Setopendrawer(true)}
            // setShowDrawer(!showDrawer)
          />
        </div>
        <div className="info_direct_share_toggle_main">
          <div onClick={infoFunction}>
            <InfoOutlinedIcon
              style={{
                color: "#8C6766",
                marginTop: "4px",
                fontSize: "1.5em",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="direct_share_div">{t("directShare")}</div>
          <div className="toggle_switch_div">
            <Switch
              {...label}
              checked={direct}
              style={{ fontSize: "1.2rem" }}
              // color="string"
              onChange={(e) => handleSwitchOnChange(e)}
            />
            {/* toggleSwitch */}
          </div>
        </div>

        {direct && <div className="direct_share_msg">{t("doubletab")}</div>}

        {/* style={t("doubletab").length > 41 ? { fontSize: `14px` } : { fontSize: `15px` }} */}
        {/* <div className="socialIcons_home_main">
          <div className="social_icons_main_div">
            {loginUserData?.links &&
              loginUserData?.links?.length > 0 &&
              loginUserData?.links?.map((item) => {
                return (
                  <div
                    className="home_screen_social_sites_main"
                    style={{
                      opacity: direct
                        ? selected == item.name
                          ? "100%"
                          : "50%"
                        : "100%",
                    }}
                    id={item}
                    onClick={() => handleOpenSliderFunc(item)}
                  >
                    <SocialSites item={item} text={item?.name} />
                  </div>
                );
              })}
            {!toggleSwitch && (
              <AddMore onPress={() => navigate("/edit/home")} />
            )}
          </div>
          <div
       
          ></div>
        </div> */}

        {/* <div className="home-icons-main">
          <div className="home-icons-container">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items?.map((elm, index) => (
                      <Draggable
                        key={elm?.name}
                        draggableId={elm?.name}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div
                              class="single-social"
                  
                            >
                              <div class="icon-img-div">
                                <DragIndicatorIcon className="dragicon" />

                                {returnSocialImages2(elm)}
                                <p class="socialname">{elm?.name}</p>
                              </div>
                              <div class="theswitch">
                                <div className="editbtn">Edit</div>
                                <Switch
                               
                                  sx={{ color: "black" }}
                             
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div> */}

        {direct ? (
          <div className="home-icons-main" style={{ height: "295px" }}>
            <div className="home-icons-container">
              {items ? (
                items?.map((elm, index) => (
                  <div
                    className="single-social"
                    key={index}
                    style={{
                      opacity: direct
                        ? selected == elm.name
                          ? "100%"
                          : "30%"
                        : "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenSliderFunc(elm)}
                  >
                    <SortableItem
                      id={elm}
                      btnName="Make Direct"
                      togle={false}
                    />
                  </div>
                ))
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 500,
                    fontFamily: "MadeOuterSansLight ,sans-serif",
                  }}
                >
                  {t("noLinks")}
                  <span
                    style={{
                      fontFamily: "MadeOuterSansLight ,sans-serif",
                      textDecoration: "underline",
                      marginLeft: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                    onClick={() => navigate("/edit/home")}
                  >
                    {t("addLink")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="home-icons-main" style={{ height: "315px" }}>
            <div className="home-icons-container">
              {items ? (
                items?.map((elm, index) => (
                  <div
                    className="single-social"
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    // onTouchStart={(e) => handleTouchStart2(e, index)}
                    // onTouchMove={handleTouchMove2}
                    // onTouchEnd={(e) => handleTouchEnd(e, index)}
                  >
                    <SortableItem id={elm} btnName="Edit" togle={true} />
                  </div>
                ))
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 500,
                    fontFamily: "MadeOuterSansLight ,sans-serif",
                  }}
                >
                  {t("noLinks")}
                  <span
                    style={{
                      fontFamily: "MadeOuterSansLight ,sans-serif",
                      textDecoration: "underline",
                      marginLeft: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                    onClick={() => navigate("/edit/home")}
                  >
                    {t("addLink")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* <div className="home-icons-main">
          <div className="home-icons-container">
            {items &&
              items?.map((elm, index) => (
                <div
                  className="single-social"
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onTouchStart={(e) => handleTouchStart2(e, index)}
                  onTouchMove={handleTouchMove2}
                  onTouchEnd={(e) => handleTouchEnd(e, index)}
                  style={{
                    opacity: direct
                      ? selected == elm.name
                        ? "100%"
                        : "30%"
                      : "100%",
                  }}
                >
                  <SortableItem id={elm} />
                </div>
              ))}
          </div>
        </div> */}
        {/* <div className="home-icons-main">
          <div className="home-icons-container">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              {items && (
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  
                  {items?.map((elm) => (
                    <SortableItem key={elm?.name} id={elm} />
                  ))}
                </SortableContext>
              )}
            </DndContext>
          </div>
        </div> */}
        <div className="Hhome_social_sites_main">
          <SocialSlider
            showSlide={showSocialSlider?.status}
            hideSlide={() => setShowSocialSlider(false)}
            inputData={inputData}
            data={showSocialSlider?.item}
            openAppFunc={(data) => handleOpenAppFunc(data)}
            socialSliderTextFieldOnChange={(e) =>
              socialSliderTextFieldOnChange(e)
            }
            submit={(data) => handleSocialSliderSubmitButton(data)}
            deleteSocialLink={(data) => handleDeleteSocialLinkFunc(data)}
            questionMarkPress={() => setShowInstructions(true)}
          />
          <InstructionsPopup
            showPopup={showInstructions}
            hidePopup={() => setShowInstructions(false)}
            submit={() => setShowInstructions(false)}
            data={showSocialSlider.item}
          />
          <ProfileSwitchPopup
            showPopup={showSwitchPopup}
            hidePopup={() => setShowSwitchPopup(false)}
            submit={() => setShowSwitchPopup(false)}
            text={toggleSwitch ? t("directon") : t("directoff")}
            title={t("Alert")}
            homeScreen={true}
          />
          <ToastContainer position="top-center" autoClose={1000} />
        </div>
        {Opendrawer && (
          <div className="sideDrawer_main_div">
            <Drawer hideDrawer={() => setShowDrawer(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
