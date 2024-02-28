import React, { useRef } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Heading } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Homegrid.css";

const HomegridItem = (props) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Interpolate scrollYProgress to a scale value
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  // Interpolate scrollYProgress to a rotate value
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  // Interpolate scrollYProgress to a opacity value
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // Interpolate scrollYProgress to a translateX value
  const translateX = useTransform(scrollYProgress, [0, 0.5, 1], [180, 0, 180]);

  return (
    <section className="homegriditem-scroll-box">
      <motion.div
        className="homegriditem-main-box"
        ref={ref}
        onClick={() => navigate(props.data.link)}
        style={{
          scale: scale,
          rotate: rotate,
          translateX: translateX,
          opacity: opacity,
        }}
      >
        <div className="homegriditem-gif-part">
          <Player
            autoplay
            loop
            speed={0.3}
            src={props.data.gif}
            style={{ height: "180px", width: "180px" }}
          >
            <Controls visible={false} />
          </Player>
        </div>
        <div className="homegriditem-text-part">
          <Heading size="lg" textAlign="center" color="rgb(255, 128, 0)">
            {props.data.text}
          </Heading>
        </div>
      </motion.div>
    </section>
  );
};

export default HomegridItem;
