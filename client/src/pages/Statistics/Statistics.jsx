import React, { useEffect } from "react";
import "./Statistics.css";
import Navbar from "../../components/Navbar/Navbar";
import { Heading } from "@chakra-ui/react";
import RadarStats from "../../components/Statistics/RadarStats/RadarStats";
import { useSelector, useDispatch } from "react-redux";
import { getAllResults } from "../../actions/results";
import PieStats from "../../components/Statistics/PieStats/PieStats";
import LineStats from "../../components/Statistics/LineStats/LineStats";

const Statistics = () => {
  const User = useSelector((state) => state.currentUserReducer)?.result;
  const userId = User?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllResults(userId));
  }, [userId, dispatch]);
  const userResults = useSelector((state) => state.allResultsReducer)?.data;
  return (
    <div className="stats-main-container">
      <Navbar heading="darkblue" button="twitter" />
      {userResults?.length > 0 && userId && (
        <div className="stats-content-container">
          <div className="stats-left-container">
            <div className="stats-radar-chart-container">
              <Heading color="#8884d8" size="lg" textAlign="center">
                செயல்திறன் பகுப்பாய்வு
              </Heading>
              <RadarStats results={userResults} />
            </div>
          </div>
          <div className="stats-right-container">
            <div className="stats-rt-container">
              <div className="stats-piechart-container">
                <Heading color="#8884d8" size="lg" textAlign="center">
                  சோதனை பகுப்பாய்வு
                </Heading>
                <PieStats results={userResults} />
              </div>
              <div className="stats-incentive-container">
                <Heading color="#8884d8" size="lg" textAlign="center">
                  விரைவில்....!
                </Heading>
              </div>
            </div>
            <div className="stats-rb-container">
              <Heading color="#8884d8" size="lg" textAlign="center">
                சோதனை அதிர்வெண்
              </Heading>
              <LineStats results={userResults} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
