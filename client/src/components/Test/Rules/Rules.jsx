import React from "react";
import { motion } from "framer-motion";
import { Button, Heading } from "@chakra-ui/react";
import "./Rules.css";

const Rules = (props) => {
  return (
    <motion.div
      key="transScr"
      className="rules-main-container"
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.8,
      }}
      style={{ color: props.color }}
    >
      <div
        className="rules-heading-container"
        style={{ borderBottom: "2px solid " + props.color }}
      >
        <Heading size="2xl">{props.heading}</Heading>
        <Heading size="xl">{props.subheading}</Heading>
      </div>

      <div className="rules-content-container">
        <>
          <Heading size="lg" fontWeight="400" textAlign="left" flexWrap="wrap">
            {props.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < props.content.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </Heading>
        </>
      </div>
      <>
        <div className="rules-button-container">
          <Button
            variant="solid"
            colorScheme={props.color === "teal" ? "teal" : "purple"}
            onClick={() => props.closeRules()}
          >
            மூடவும் மற்றும் தொடங்கவும்
          </Button>
        </div>
      </>
    </motion.div>
  );
};

export default Rules;
