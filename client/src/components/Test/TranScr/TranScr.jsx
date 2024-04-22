import React from "react";
import { motion } from "framer-motion";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import "./TranScr.css";

const TranScr = (props) => {
  return (
    <motion.div
      key="transScr"
      className="tr-main-container"
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.8,
      }}
    >
      <div className="tr-text-container">
        <Heading color="turquoise">
          {props.trial ? "அடுத்த விசாரணை" : "அடுத்த கேள்வி"}
        </Heading>
        <Heading color="turquoise" size="lg">
          {props.description}
        </Heading>
      </div>
      <div className="tr-button-container">
        {props.button ? (
          <Button variant="solid" colorScheme="teal" size="lg">
            Next
          </Button>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
  );
};

export default TranScr;
