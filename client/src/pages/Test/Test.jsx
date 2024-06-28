import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TestA from "../../components/Test/TestA/TestA";
import "./Test.css";
import { Button, Heading } from "@chakra-ui/react";
import Rules from "../../components/Test/Rules/Rules";
import { testARules, testBRules } from "../../const";
import { levelADataES } from "../../const";
import TestB from "../../components/Test/TestB/TestB";
import { useDispatch, useSelector } from "react-redux";
import { getDBJson } from "../../actions/dbJson";

const Test = (props) => {
  const location = useLocation();
  const [showRules, setShowRules] = useState(true);

  let content = "";
  let testType = "";
  let amal = undefined;

  if (location.pathname.includes("envsounds")) {
    content = "envsounds";
  } else if (location.pathname.includes("music")) {
    content = "music";
  } else if (location.pathname.includes("speech")) {
    content = "speech";
  } else if (location.pathname.includes("diffsounds")) {
    content = "diffsounds";
  } else if (location.pathname.includes("communication")) {
    content = "communication";
  }

  if (location.pathname.includes("TestA")) {
    testType = "A";
  } else {
    testType = "B";
  }

  if (location.pathname.includes("diffsounds")) {
    amal = false;
  } else {
    amal = true;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDBJson(testType, content));
  }, [testType, content, dispatch]);

  const jsonData = useSelector((state) => state.dbJsonReducer)?.data;

  const toggleRules = () => {
    setShowRules((prevState) => !prevState);
  };

  return (
    <div className="test-main-container">
      {showRules && testType === "A" && (
        <Rules
          heading="செவிவழி விழிப்புணர்வு"
          subheading={
            content === "envsounds"
              ? "சுற்றுச்சூழல் ஒலிகள்"
              : content === "music"
              ? "இசை"
              : "பேச்சு"
          }
          content={testARules}
          closeRules={toggleRules}
          color="teal"
        />
      )}
      {showRules && testType === "B" && (
        <Rules
          heading="செவிவழி வேறுபாடு"
          subheading={
            content === "diffsounds"
              ? "ஒலிகலின் வேறுபாட்டை அறிக"
              : content === "communication"
              ? "சொல்லின் தொடர்பு நோக்கத்தின் வேறுபாடு"
              : "தமிழ் சத்தங்களை அறிக"
          }
          content={testBRules}
          closeRules={toggleRules}
          color="rgb(155, 129, 191)"
        />
      )}
      <div className="test-heading-container">
        <div className="test-headers">
          <Heading
            fontWeight="800"
            color={
              location.pathname.includes("TestA")
                ? "teal"
                : "rgb(155, 129, 191)"
            }
            size="2xl"
          >
            {location.pathname.includes("TestA")
              ? "செவிவழி விழிப்புணர்வு"
              : "செவிவழி வேறுபாடு"}
          </Heading>
          <Heading
            fontWeight="800"
            color={
              location.pathname.includes("TestA")
                ? "teal"
                : "rgb(155, 129, 191)"
            }
            size="xl"
          >
            நிலை {props.level}: {levelADataES[props.level - 1]["description"]}
          </Heading>
        </div>
        <Button
          colorScheme={location.pathname.includes("TestA") ? "teal" : "purple"}
          onClick={toggleRules}
          className="testa-help-button"
          size="lg"
          zIndex="0"
        >
          உதவி
        </Button>
      </div>
      {jsonData && (
        <div className="test-question-container">
          {
            location.pathname.includes("TestA") ? (
              <TestA jsonData={jsonData} level={props.level} />
            ) : (
              <TestB jsonData={jsonData} level={props.level} amal={amal} />
            ) //Add B
          }
        </div>
      )}
    </div>
  );
};

export default Test;
