import React from "react";
import "./Statistics.css";
import Navbar from "../../components/Navbar/Navbar";
import { Heading } from "@chakra-ui/react";

const Statistics = () => {
  return (
    <div className="stats-main-container">
      <Navbar heading="orangered" button="orange" />
      <Heading size="lg"></Heading>
      <div className="stats-content-container"></div>
    </div>
  );
};

export default Statistics;
