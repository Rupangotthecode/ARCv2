import React from "react";
import { Heading } from "@chakra-ui/react";
import TLMitem from "./TLMitem";
import { useSelector } from "react-redux";
import "./TestLevelMenu.css";

const TestLevelMenu = ({ levelData, heading, parameter }) => {
  const User = useSelector((state) => state.currentUserReducer)?.result;

  return (
    <>
      {User && (
        <div className="tlm-main-container">
          <div className="tlm-heading-container">
            <Heading size="2xl" textAlign="center">
              {heading}
            </Heading>
          </div>
          <div className="tlm-content-container">
            {levelData.map((item, index) => (
              <div className="tlm-tlmi-container" key={index}>
                <TLMitem item={item} parameter={parameter} User={User} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TestLevelMenu;
