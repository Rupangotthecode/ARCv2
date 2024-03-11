import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import TestMenu from "./pages/TestMenu/TestMenu";
import { TestAOptions, levelADataMU, levelADataSP } from "./const";
import Test from "./pages/Test/Test";
import TestLevelMenu from "./pages/TestLevelMenu/TestLevelMenu";
import { levelADataES } from "./const";
import Result from "./pages/Result/Result";

const AllRoutes = () => {
  const location = useLocation();

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

        <Route path="/TestA/music" element={<Test page="music" />} />
        <Route path="/TestA/speech" element={<Test page="speech" />} />
        <Route path="/result/:resId" element={<Result />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AllRoutes;
