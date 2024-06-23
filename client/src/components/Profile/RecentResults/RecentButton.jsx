import React from "react";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./RecentResults.css";

const RecentButton = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="rb-main-container"
      onClick={() => navigate(props.resultPath)}
      style={{
        backgroundColor: props.pass
          ? "rgb(221, 255, 255)"
          : "rgb(255, 230, 216)",
      }}
    >
      <div className="rb-left-container">
        <Heading
          size="md"
          fontWeight="light"
          color={props.pass ? "teal" : "orangered"}
        >
          {props.testName}
        </Heading>
        <Heading
          size="sm"
          fontWeight="light"
          color={props.pass ? "teal" : "orangered"}
        >
          {props.date}
        </Heading>
      </div>
      <div className="rb-right-container">
        <Heading
          size="md"
          fontWeight="normal"
          color={props.pass ? "teal" : "orangered"}
        >
          {props.pass ? "Pass" : "Fail"}
        </Heading>
      </div>
    </div>
  );
};

export default RecentButton;
