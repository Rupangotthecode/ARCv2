import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import "./Result.css";
import { Heading } from "@chakra-ui/react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import pass from "../../assets/result/pass.json";
import fail from "../../assets/result/fail.json";

const Result = (props) => {
  const resultData = useSelector((state) => state.resultsReducer)?.data;

  console.log(resultData);
  return (
    <div className="result-main-container">
      <Navbar
        heading={resultData?.passed ? "teal" : "orangered"}
        button={resultData?.passed ? "teal" : "orange"}
      />
      {resultData && (
        <div className="result-inner-container">
          <div
            className="result-top-container"
            style={{ color: resultData?.passed ? "teal" : "orangered" }}
          >
            <div className="result-detail-container">
              <Heading size="2xl">சோதனை விவரங்கள்</Heading>
              <Heading size="lg">{resultData.testName}</Heading>
              <Heading size="lg">நிலை: {resultData.testLevel}</Heading>
              <Heading size="lg">தேதி: {resultData.date}</Heading>
            </div>
            <div className="result-gif-container">
              <Player
                autoplay
                loop
                speed={0.3}
                src={resultData?.passed ? pass : fail}
                style={{ height: "230px", width: "230px" }}
              >
                <Controls visible={false} />
              </Player>
            </div>
            <div className="result-score-container">
              <Heading
                size="lg"
                borderWidth="5px"
                borderColor={resultData?.passed ? "teal" : "orangered"}
                p="4%"
                borderStyle="dashed"
                borderRadius="30px"
              >
                மதிப்பெண்: {resultData.score}
              </Heading>
              <Heading
                size="lg"
                bg={resultData?.passed ? "teal" : "orangered"}
                p="4%"
                borderRadius="30px"
                color="white"
                textAlign="center"
              >
                {resultData?.passed ? "Passed" : "Failed"}
              </Heading>
            </div>
          </div>
          <div className="result-bottom-container">
            <ResponsiveContainer>
              <BarChart data={resultData.testDetails}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question1" />

                <Tooltip />
                <Legend />
                <Bar dataKey="t1" stackId="a" fill="#8884d8" />
                <Bar dataKey="t2" stackId="a" fill="#82ca9d" />
                <Bar dataKey="t3" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
