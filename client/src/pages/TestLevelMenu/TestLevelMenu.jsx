import React from "react";
import { Heading } from "@chakra-ui/react";
import TLMitem from "./TLMitem";
import "./TestLevelMenu.css";

const TestLevelMenu = ({ levelData, heading }) => {
  console.log(levelData);

  return (
    <div className="tlm-main-container">
      <div className="tlm-heading-container">
        <Heading size="2xl" textAlign="center">
          {heading}
        </Heading>
      </div>
      <div className="tlm-content-container">
        {levelData.map((item, index) => (
          <div className="tlm-tlmi-container">
            <TLMitem item={item} key={index} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestLevelMenu;
