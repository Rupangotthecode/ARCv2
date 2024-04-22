import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import TestMenu from "./pages/TestMenu/TestMenu";
import {
  TestAOptions,
  TestBOptions,
  levelADataMU,
  levelADataSP,
  levelBDataDS,
} from "./const";
import Test from "./pages/Test/Test";
import TestLevelMenu from "./pages/TestLevelMenu/TestLevelMenu";
import { levelADataES } from "./const";
import Result from "./pages/Result/Result";
import Profile from "./pages/Profile/Profile";
import { useDispatch } from "react-redux";
import { logout } from "./actions/auth";

const AllRoutes = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutTimerRef = useRef(null);

  useEffect(() => {
    const resetLogoutTimer = () => {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = setTimeout(() => {
        // Call your logout logic here
        // Assuming you're using Redux for state management
        dispatch(logout(navigate));
      }, 5 * 60 * 1000); // 15 minutes in milliseconds
    };

    // Event listeners to track user activity
    const setupEventListeners = () => {
      // Reset the logout timer on user activity
      window.addEventListener("mousemove", resetLogoutTimer);
      window.addEventListener("keydown", resetLogoutTimer);
      window.addEventListener("scroll", resetLogoutTimer);
    };

    const initializeLogoutTimer = () => {
      setupEventListeners();
      resetLogoutTimer();
    };

    initializeLogoutTimer();

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keydown", resetLogoutTimer);
      window.removeEventListener("scroll", resetLogoutTimer);
    };
  }, [dispatch, navigate]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/TestA"
          element={
            <TestMenu
              options={TestAOptions}
              currentTest="செவிவழி விழிப்புணர்வு"
            />
          }
        />
        <Route
          path="/TestB"
          element={
            <TestMenu options={TestBOptions} currentTest="செவிவழி வேறுபாடு" />
          }
        />
        <Route
          path="/TestA/envsounds/TLM"
          element={
            <TestLevelMenu
              levelData={levelADataES}
              heading="செவிவழி விழிப்புணர்வு - சுற்றுச்சூழல் ஒலிகள்"
              parameter="A_1"
            />
          }
        />
        <Route
          path="/TestA/music/TLM"
          element={
            <TestLevelMenu
              levelData={levelADataMU}
              heading="செவிவழி விழிப்புணர்வு - இசை"
              parameter="A_2"
            />
          }
        />
        <Route
          path="/TestA/speech/TLM"
          element={
            <TestLevelMenu
              levelData={levelADataSP}
              heading="செவிவழி விழிப்புணர்வு - பேச்சு"
              parameter="A_3"
            />
          }
        />
        <Route
          path="/TestB/diffsounds/TLM"
          element={
            <TestLevelMenu
              levelData={levelBDataDS}
              heading="செவிவழி வேறுபாடு - ஒலிகலின் வேறுபாட்டை அறிக"
              parameter="B_1"
            />
          }
        />
        <Route
          path="/TestA/envsounds/Level1"
          element={<Test page="envsounds" level={1} />}
        />
        <Route
          path="/TestA/envsounds/Level2"
          element={<Test page="envsounds" level={2} />}
        />
        <Route
          path="/TestA/envsounds/Level3"
          element={<Test page="envsounds" level={3} />}
        />
        <Route
          path="/TestA/envsounds/Level4"
          element={<Test page="envsounds" level={4} />}
        />

        <Route
          path="/TestA/music/Level1"
          element={<Test page="music" level={1} />}
        />
        <Route
          path="/TestA/music/Level2"
          element={<Test page="music" level={2} />}
        />
        <Route
          path="/TestA/music/Level3"
          element={<Test page="music" level={3} />}
        />
        <Route
          path="/TestA/music/Level4"
          element={<Test page="music" level={4} />}
        />

        <Route
          path="/TestB/diffsounds/Level1"
          element={<Test page="diffsounds" level={1} />}
        />
        <Route
          path="/TestB/diffsounds/Level2"
          element={<Test page="diffsounds" level={2} />}
        />
        <Route
          path="/TestB/diffsounds/Level3"
          element={<Test page="diffsounds" level={3} />}
        />

        <Route
          path="/TestB/speech/Level1"
          element={<Test page="speech" level={1} />}
        />
        <Route
          path="/TestB/speech/Level2"
          element={<Test page="speech" level={2} />}
        />
        <Route
          path="/TestB/speech/Level3"
          element={<Test page="speech" level={3} />}
        />

        <Route
          path="/TestB/communication/Level1"
          element={<Test page="communication" level={1} />}
        />
        <Route
          path="/TestB/communication/Level2"
          element={<Test page="communication" level={2} />}
        />
        <Route
          path="/TestB/communication/Level3"
          element={<Test page="communication" level={3} />}
        />

        <Route path="/result/:resId" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AllRoutes;
