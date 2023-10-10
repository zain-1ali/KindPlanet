import React, { useState, useContext, useReducer } from "react";
import { getStorage, ref as storagref, getDownloadURL } from "firebase/storage";
import { db, storage } from "./../Components/Services/Firebase/config";
import NewReducer from "./newReducer";
// ../Services/Firebase/config
// import {
//   loginUserInfoSelector,
//   userLoginObjectSelector,
// } from "../Redux/Login/selectors";
// import { useSelector } from "react-redux";
// ../../../Redux/Login/selectors

let INITIAL_STATE = {
  profileurl: ''
};

const AppContext = React.createContext(INITIAL_STATE);





let AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(NewReducer, INITIAL_STATE);

  let [sociallogin, setsociallogin] = useState(false)

  let [Opendrawer, Setopendrawer] = useState(false)
  // const loginUserData = useSelector(loginUserInfoSelector);


  // const [profileurl, setprofileurl] = useState('')
  // const storageRef = storagref(storage, loginUserData?.profileUrl)
  // getDownloadURL(storageRef).then((URL) => {
  //   console.log(URL)
  //   setprofileurl(URL)

  // }).catch((error) => {
  //   console.log(error)
  // });
  // console.log(profileurl)


  return (<AppContext.Provider value={{ Opendrawer, Setopendrawer, setsociallogin, sociallogin }}>{children}</AppContext.Provider>);
}

export { AppContext, AppProvider };
