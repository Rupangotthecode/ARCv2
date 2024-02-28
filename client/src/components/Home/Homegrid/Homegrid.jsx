import React from "react";
import HomegridItem from "./HomegridItem";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform } from "framer-motion";
import gearImage from "../../../assets/home/gear.png";
import hi from "../../../assets/home/hi.json";
import "./Homegrid.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Image } from "@chakra-ui/react";

const Homegrid = (props) => {
  const { scrollY } = useScroll();

  const rotateWheel = useTransform(scrollY, [0, 0, 4000], [0, 0, 180]);

  return (
    <div className="homegrid-main-container">
      <div className="homegrid-internal-container">
        {props.data.map((item, index) => (
          <HomegridItem data={item} key={index} />
        ))}
      </div>
      <div className="homegrid-welcome-container">
        <Typewriter
          options={{ cursor: "", delay: 80 }}
          onInit={(typewriter) => {
            typewriter
              .typeString(`வணக்கம் ${props.user.name}!`)
              .callFunction(() => {
                console.log("String typed out!");
              })
              .start();
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
        >
          <Player
            autoplay
            loop
            speed={0.3}
            src={hi}
            style={{ height: "20vh", width: "20vw" }}
          >
            <Controls visible={false} />
          </Player>
        </motion.div>
      </div>
      <motion.div
        className="homegriditem-image-box"
        style={{
          rotate: rotateWheel,
        }}
      >
        <Image src={gearImage} alt="gear" height="80vh" />
      </motion.div>
    </div>
  );
};
export default Homegrid;
