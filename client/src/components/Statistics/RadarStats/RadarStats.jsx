import React from "react";
import "./RadarStats.css";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { createRadarChartData } from "../../../utils/StatsUtils";
import { Heading } from "@chakra-ui/react";

const RadarStats = (props) => {
  let radarData = createRadarChartData(props.results);

  return (
    <div className="rs-main-container">
      <div className="rs-chart-container">
        <ResponsiveContainer>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="testCode" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="வலிமை பகுப்பாய்வு"
              dataKey="testAvgScore"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="rs-details-container">
        {radarData.map((testObj) => (
          <Heading size="sm" color="whitesmoke" fontWeight="400">
            {testObj.testCode} : {testObj.testName}
          </Heading>
        ))}
      </div>
    </div>
  );
};

export default RadarStats;
