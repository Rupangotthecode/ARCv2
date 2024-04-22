import React from "react";
import RecentButton from "./RecentButton";
import { Button } from "@chakra-ui/react";

const RecentResults = (props) => {
  const lastTwo = props?.results?.slice(-2).reverse();
  return (
    <>
      {lastTwo?.length > 0 && (
        <div className="rr-main-container">
          <div className="rr-recent-container">
            <RecentButton
              pass={lastTwo[0].passed}
              testName={lastTwo[0].testName}
              resultPath={`/result/${lastTwo[0]._id}`}
              date={lastTwo[0].date}
            />
            <RecentButton
              pass={lastTwo[1].passed}
              testName={lastTwo[1].testName}
              resultPath={`/result/${lastTwo[1]._id}`}
              date={lastTwo[1].date}
            />
          </div>
          <div className="rr-button-container">
            <Button
              width="100%"
              height="100%"
              colorScheme="teal"
              variant="solid"
              borderBottomRadius="40px"
            >
              மேலும் பார்க்க
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentResults;
