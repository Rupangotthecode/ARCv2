import React, { useState } from "react";
import aud_awar from "../../assets/home/aud_awar.json";
import aud_disc from "../../assets/home/aud_disc.json";
import results from "../../assets/home/results.json";
import settings from "../../assets/home/settings.json";
import "./Home.css";
import Homegrid from "../../components/Home/Homegrid/Homegrid";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const User = useSelector((state) => state.currentUserReducer);

  const data = [
    { gif: aud_awar, text: "செவிவழி விழிப்புணர்வு", link: "/TestA" },
    { gif: aud_disc, text: "செவிவழி வேறுபாடு", link: "/Home" },
    { gif: results, text: "சோதனை பகுப்பாய்வு", link: "/Home" },
    { gif: settings, text: "அமைப்புகள்", link: "/Home" },
  ];
  const [admin, setAdmin] = useState(true);

  return (
    <div className="home-main-container">
      <Navbar heading="orangered" button="orange" />
      <div className="home-content-container">
        <div className="home-welcome-container"></div>
        <div className="home-cartwheel">
          {admin ? (
            <Homegrid data={data} user={User.result} />
          ) : (
            <h1>Hi, child</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
