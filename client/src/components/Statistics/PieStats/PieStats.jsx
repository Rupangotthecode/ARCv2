import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import "./PieStats.css";
import {
  createTestLevelData,
  createTestPieData,
} from "../../../utils/StatsUtils";

const PieStats = (props) => {
  const levelPieData = createTestLevelData(props.results);
  const testPieData = createTestPieData(props.results);

  return (
    <div className="pc-main-container">
      <ResponsiveContainer>
        <PieChart width={730} height={250}>
          <Pie
            data={testPieData}
            dataKey="testCounter"
            nameKey="testName"
            cx="50%"
            cy="50%"
            innerRadius={"150"}
            fill="#8884d8"
            label
            labelLine={false}
          />
          <Pie
            data={levelPieData}
            dataKey="testCounter"
            nameKey="testName"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#82ca9d"
            label
            labelLine={false}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieStats;
