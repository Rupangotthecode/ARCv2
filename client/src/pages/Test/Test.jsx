import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TestA from "../../components/Test/TestA/TestA";
import "./Test.css";
import { Button, Heading } from "@chakra-ui/react";
import Rules from "../../components/Test/Rules/Rules";
import { testARules } from "../../const";
import { levelADataES, levelADataMU } from "../../const";
import axios from "axios";

const Test = (props) => {
  const location = useLocation();
  const [showRules, setShowRules] = useState(true);

  let content = "";

  if (location.pathname.includes("envsounds")) {
    content = "envsounds";
  } else if (location.pathname.includes("music")) {
    content = "music";
  } else if (location.pathname.includes("speech")) {
    content = "speech";
  }

  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    axios
      .get(`/db_json/A_${content}.json`)
      .then((response) => {
        setJsonData(response.data);
      })
      .then(console.log("hi"))
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const toggleRules = () => {
    setShowRules((prevState) => !prevState);
  };

  return (
    <div className="test-main-container">
      {showRules && (
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
        />
      )}
      <div className="test-heading-container">
        <div className="test-headers">
          <Heading fontWeight="800" color="teal" size="2xl">
            {location.pathname.includes("TestA")
              ? "செவிவழி விழிப்புணர்வு"
              : "செவிவழி வேறுபாடு"}
          </Heading>
          <Heading fontWeight="800" color="teal" size="xl">
            {content === "envsounds" &&
              `நிலை ${props.level}: ${
                levelADataES[props.level - 1]["description"]
              }`}
            {content === "music" &&
              `நிலை ${props.level}: ${
                levelADataMU[props.level - 1]["description"]
              }`}
          </Heading>
        </div>
        <Button
          colorScheme="teal"
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
              <TestA />
            ) //Add B
          }
        </div>
      )}
    </div>
  );
};

export default Test;
