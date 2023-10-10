import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./Screens/SplashScreen/SplashScreen";
import SignupOptionsScreen from "./Screens/SignupOptionsScreen/SignupOptionsScreen";
import SignupScreen from "./Screens/SignupScreen/SignupScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen/ForgotPasswordScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import EditHomeScreen from "./Screens/EditHomeScreen/EditHomeScreen";
import QRCodeScreen from "./Screens/QRCodeScreen/QRcodeScreen";
import ActivateSapidScreen from "./Screens/ActivateSapidScreen/ActivateSapidScreen";
import Splash2 from "./Components/organisms/Splash2/Splash2";
import SplashScreen2 from "./Screens/SplashScreen2/SplashScreen2";
import SignupWithTag from "./Screens/SignupWithTag/SignupWithTag";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SplashScreen2 />} />
          <Route exact path="/Signoption" element={<SplashScreen />} />
          <Route
            exact
            path="/signupwithtag/:tagId"
            element={<SignupWithTag />}
          />
          {/* <Route exact path="/signup/with" element={<SignupOptionsScreen />} /> */}
          <Route exact path="/signin" element={<LoginScreen />} />
          <Route
            exact
            path="/password/forgot"
            element={<ForgotPasswordScreen />}
          />

          <Route path="/signup">
            <Route path=":tagId" element={<SignupScreen />} />
            <Route path="" element={<SignupScreen />} />
          </Route>
          {/* <Route exact path="/signup">
            <Route path=":tagId?" element={<SignupScreen />} />
          </Route> */}
          <Route exact path="/home" element={<HomeScreen />} />
          <Route exact path="/edit/home" element={<EditHomeScreen />} />
          <Route exact path="/scan/your/code" element={<QRCodeScreen />} />
          {/* <Route
            exact
            path="/activate/sapid"
            element={<ActivateSapidScreen />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
