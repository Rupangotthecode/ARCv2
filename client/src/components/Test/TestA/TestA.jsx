import { Button, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./TestA.css";
import TranScr from "../TranScr/TranScr";
import { useDispatch, useSelector } from "react-redux";

const TestA = (props) => {
  const [showTransScr, setShowTransScr] = useState(false);

  const [testData, setTestData] = useState();

  useEffect(() => {
    setTestData(props?.jsonData?.[props?.level - 1]);
  }, [props.jsonData, props.level]);

  // props?.jsonData?.[props.level - 1];
  const handleAnswer = () => {
    setShowTransScr(true);
    setqno((prevValue) => prevValue + 1);
    setAud((prevState) => ({
      ...prevState,
      audio: null,
      isPlaying: false,
    }));
    setTimeout(() => {
      setShowTransScr(false);
    }, 2500);
  };

  const [qno, setqno] = useState(1);
  const [tno, settno] = useState(1);
  const [correctAns, setCorrectAns] = useState();

  const [aud, setAud] = useState({
    audio: null,
    isPlaying: false,
  });

  useEffect(() => {
    const audioLink = testData?.[qno]["audio"];
    const encodedLink = encodeURIComponent(audioLink);
    const completeLink = "http://localhost:5000/audio/get/" + encodedLink;
    setAud((prevState) => ({ ...prevState, audio: new Audio(completeLink) }));
  }, [qno, testData]);

  const playpause = (variable, setVariable) => {
    console.log(variable);
    setVariable((prevState) => {
      const playState = prevState.isPlaying;
      if (playState) {
        console.log("pausing");
        variable.audio.pause();
      } else {
        console.log("Playing");
        variable.audio.play();
      }
      return { ...prevState, isPlaying: !playState };
    });
  };

  useEffect(() => {
    aud.audio?.addEventListener("ended", () => {
      setAud((prevState) => ({
        ...prevState,
        isPlaying: false,
      }));
    });
  }, [aud]);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 1000);
    console.log(randomNum);
    if (randomNum % 2 === 0) {
      setCorrectAns(1);
    } else {
      setCorrectAns(0);
    }
  }, [tno, setCorrectAns]);

  return (
    <>
      {props.jsonData && (
        <div className="testa-main-container">
          {showTransScr && (
            <TranScr trial={true} button={false} description="" />
          )}

          <div className="testa-question-container">
            <div className="testa-questionTop-container">
              <Heading size="xl" color="rgb(244, 254, 255)">
                நீங்கள் ஒலி கேட்க முடியுமா?
              </Heading>
            </div>
            <div className="testa-questionBottom-container">
              <div className="testa-input-container">
                <div className="testa-option-container" onClick={handleAnswer}>
                  <Heading size="xl" color="rgb(244, 254, 255)">
                    ஆம்
                  </Heading>
                </div>
                <div className="testa-option-container" onClick={handleAnswer}>
                  <Heading size="xl" color="rgb(244, 254, 255)">
                    இல்லை
                  </Heading>
                </div>
              </div>
              <div className="testa-play-container">
                <div
                  className="testa-play-button"
                  onClick={() => playpause(aud, setAud)}
                >
                  {aud.isPlaying ? (
                    <FontAwesomeIcon
                      icon={faPause}
                      color="rgb(244, 254, 255)"
                      size="2xl"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlay}
                      color="rgb(244, 254, 255)"
                      size="2xl"
                    />
                  )}
                </div>
              </div>
              <div className="testa-picture-container"></div>
            </div>
          </div>
          <div className="testa-data-container">
            <div className="testa-databox levelname">
              <Heading size="lg" color="teal">
                நிலை x: x'
              </Heading>
            </div>
            <div className="testa-databox trial">
              <Heading size="lg" color="teal">
                சோதனை x/3
              </Heading>
            </div>
            <div className="testa-databox question-number">
              <Heading size="lg" color="teal">
                கேள்வி எண்: x/x'
              </Heading>
            </div>
            <div className="testa-databox point">
              <Heading size="lg" color="teal">
                மொத்த மதிப்பெண்: x/x'
              </Heading>
            </div>
            <div className="testa-databox exit-buttons">
              <div className="testa-exitbtn exitbtn-red">
                <Heading color="rgb(244, 254, 255)" size="lg">
                  சமர்ப்பிக்கவும்
                </Heading>
              </div>
              <div
                className="testa-exitbtn"
                style={{ backgroundColor: "orangered" }}
              >
                <Heading color="rgb(244, 254, 255)" size="lg">
                  வெளியேறு
                </Heading>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestA;
