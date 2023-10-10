import React from 'react';
import { useSelector } from 'react-redux';
import Home from '../../Components/organisms/Home/Home';
import { getStorage, ref, getDownloadURL, child } from "firebase/storage";
// import { storage } from '../../Components/Services/Firebase/config';

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {
  loginUserInfoSelector,
  userLoginObjectSelector,
} from "../../Redux/Login/selectors";
import { useState } from 'react';
import { useEffect } from 'react';
const HomeScreen = () => {
  const loginUserData = useSelector(loginUserInfoSelector);
  const [profileurl, setprofileurl] = useState('')


  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 1000)
  }, [])


  return (
    <div>
      {
        loading ? <LoadingScreen /> : <Home />
      }


    </div>
  )
}

export default HomeScreen