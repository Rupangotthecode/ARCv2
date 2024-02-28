import { Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TestLevelMenu.css";

const TLMitem = ({ item }) => {
  console.log(item);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(item.path);
  };
  return (
    <div className="tlmi-main-box" onClick={handleClick}>
      <Heading>நிலை {item.level}</Heading>
      <Heading>{item.description}</Heading>
    </div>
  );
};

export default TLMitem;
