import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllResults } from "../../actions/results";
import "./Allresults.css";
import Navbar from "../../components/Navbar/Navbar";
import RecentButton from "../../components/Profile/RecentResults/RecentButton";
import { Divider, Heading } from "@chakra-ui/react";
import SearchTool from "../../components/AllResults/SearchTool";

const Allresults = () => {
  const User = useSelector((state) => state.currentUserReducer)?.result;
  const userId = User?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllResults(userId));
  }, [userId, dispatch]);
  const userResults = useSelector((state) => state.allResultsReducer)?.data;
  const filteredResults = useSelector(
    (state) => state.filteredResultsReducer
  )?.data;

  return (
    <div className="ar-main-container">
      <Navbar heading="teal" button="teal" />
      {filteredResults && userResults && (
        <div className="ar-content-container">
          <div className="ar-list-container">
            <div className="ar-list-heading-container">
              <Heading color="teal" size="lg">
                அனைத்து சோதனை முடிவுகள்
              </Heading>
              <Divider
                borderColor="teal"
                borderWidth="2px"
                borderRadius="40px"
              />
            </div>
            <div className="ar-list-content-container">
              {filteredResults.map((result, index) => (
                <RecentButton
                  key={index}
                  pass={result.passed}
                  testName={result.testName}
                  score={result.score}
                  totalScore={result.totalScore}
                  resultPath={`/result/${result._id}`}
                  date={result.date}
                />
              ))}
            </div>
          </div>
          <div className="ar-filter-container">
            <SearchTool results={userResults} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Allresults;
