import React from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { createLineChartData } from "../../../utils/StatsUtils";
import "./LineStats.css";

const LineStats = (props) => {
  let lineData = createLineChartData(props.results);
  const COLORS = { pass: "#82ca9d", fail: "red" };
  return (
    <div className="ls-main-container">
      <ResponsiveContainer>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 10,
            left: 10,
          }}
          data={lineData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="testCode"
            type="category"
            name="testCode"
            allowDuplicatedCategory={false}
          />
          <YAxis
            dataKey="percentageScore"
            type="number"
            name="Score%"
            unit="%"
          />
          <ZAxis dataKey="date" type="category" name="testDate" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter>
            {lineData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.percentageScore >= 70 ? COLORS["pass"] : COLORS["fail"]
                }
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineStats;
