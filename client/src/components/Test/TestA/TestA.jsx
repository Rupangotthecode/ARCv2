import { Heading, Image, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./TestA.css";
import TranScr from "../TranScr/TranScr";
import { submitResults } from "../../../actions/results";

const TestA = (props) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const location = useLocation();
  const navigate = useNavigate();

  const [showTransScr, setShowTransScr] = useState(false);

  const resultToast = useToast();

  const [testData, setTestData] = useState();

  useEffect(() => {
    setTestData(props?.jsonData?.[props?.level - 1]);
  }, [props.jsonData, props.level]);

  const [resArray, setResArray] = useState([]);
  const [aud, setAud] = useState({
    audio: null,
    isPlaying: false,
  });
  const [qno, setqno] = useState(1);
  const [tno, settno] = useState(1);
  const [correctAns, setCorrectAns] = useState();
  const [points, setPoints] = useState(0);
  const [trial, setTrial] = useState(true);
  const [img, setImg] = useState(null);
  const [questionStatus, setQuestionStatus] = useState({
    question: "",
    t1: false,
    t2: false,
    t3: false,
  });

  useEffect(() => {
    const audioLink = testData?.[qno]["audio"];
    const encodedAudLink = encodeURIComponent(audioLink);
    const completeAudLink = "http://localhost:5000/audio/get/" + encodedAudLink;
    setAud((prevState) => ({
      ...prevState,
      audio: new Audio(completeAudLink),
    }));
    const imgLink = testData?.[qno]["v_cue"];
    const encodedImgLink = encodeURIComponent(imgLink);
    const completeImgLink = "http://localhost:5000/image/get/" + encodedImgLink;
    setImg(completeImgLink);
    setQuestionStatus((prevState) => ({
      ...prevState,
      question1: testData?.[qno]["name"],
    }));
  }, [qno, testData]);

  const handleAnswer = (answer) => {
    if (answer === correctAns) {
      setPoints((oldPoints) => oldPoints + 1);
      if (tno === 1) {
        setQuestionStatus((prevState) => ({
          ...prevState,
          t1: true,
        }));
      } else if (tno === 2) {
        setQuestionStatus((prevState) => ({
          ...prevState,
          t2: true,
        }));
      } else {
        setQuestionStatus((prevState) => ({
          ...prevState,
          t3: true,
        }));
      }
      resultToast({
        title: "Correct, +1 point",
        status: "success",
        isClosable: true,
      });
    } else {
      resultToast({
        title: "Incorrect, 0 point",
        status: "error",
        isClosable: true,
      });
    }

    if (tno === 3) {
      if (qno === testData?.length - 1) {
        setResArray((prevState) => [...prevState, questionStatus]);
        handleSubmit();
      } else {
        setqno((prevValue) => prevValue + 1);
        settno(0);
        setTrial(false);
        setResArray((prevState) => [...prevState, questionStatus]);
        setQuestionStatus({
          question1: "",
          t1: false,
          t2: false,
          t3: false,
        });
      }
    }
    settno((prevtno) => prevtno + 1);
    aud?.audio?.pause();
    setAud((prevState) => ({
      ...prevState,
      isPlaying: false,
    }));
    setShowTransScr(true);
    console.log(resArray);
    setTimeout(() => {
      setShowTransScr(false);
      setTrial(true);
    }, 2500);
  };

  const playpause = (variable, setVariable) => {
    setVariable((prevState) => {
      const playState = prevState.isPlaying;
      if (playState && variable?.audio?.readyState >= 2) {
        console.log("pausing");
        try {
          variable.audio?.pause();
        } catch (error) {
          console.log(error);
          setqno((prevState) => prevState + 1);
          setqno((prevState) => prevState - 1);
        }
      } else {
        console.log("Playing", variable.audio);
        try {
          if (correctAns) {
            variable.audio.muted = true;
            variable?.audio?.play();
          } else {
            variable.audio.muted = false;
            variable?.audio?.play();
          }
        } catch (error) {
          setqno((prevState) => prevState + 1);
          setqno((prevState) => prevState - 1);
        }
      }
      return { ...prevState, isPlaying: !playState };
    });
  };

  const handleSubmit = () => {
    let passed = false;
    let testName = "";
    let testCode = "";
    if (points >= Math.floor(0.7 * (testData?.length - 1) * 3)) {
      passed = true;
    }
    if (location.pathname.includes("envsounds")) {
      testName = "செவிவழி விழிப்புணர்வு - சுற்றுச்சூழல் ஒலிகள்";
      testCode = "A_1";
    } else if (location.pathname.includes("music")) {
      testName = "செவிவழி விழிப்புணர்வு - இசை";
      testCode = "A_2";
    }
    if (location.pathname.includes("speech")) {
      testName = "செவிவழி விழிப்புணர்வு - பேச்சு";
      testCode = "A_3";
    }
    dispatch(
      submitResults(
        User.result._id,
        User.result.loginID,
        User.result.name,
        points,
        passed,
        testName,
        testCode,
        props.level,
        resArray,
        navigate
      )
    );
  };

  useEffect(() => {
    const audioElement = aud.audio;
    console.log("in");
    const handleEnded = () => {
      console.log("Before", aud);
      setAud((prevState) => ({
        ...prevState,
        isPlaying: false,
      }));
    };

    audioElement?.addEventListener("ended", handleEnded);

    return () => {
      audioElement?.removeEventListener("ended", handleEnded);
    };
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
            <TranScr
              trial={trial}
              button={false}
              description={trial ? "" : "தயாராய் இரு!"}
            />
          )}

          <div className="testa-question-container">
            <div className="testa-questionTop-container">
              <Heading size="xl" color="rgb(244, 254, 255)">
                நீங்கள் ஒலி கேட்க முடியுமா?
              </Heading>
            </div>
            <div className="testa-questionBottom-container">
              <div className="testa-input-container">
                <div
                  className="testa-option-container"
                  onClick={() => handleAnswer(0)}
                >
                  <Heading size="xl" color="rgb(244, 254, 255)">
                    ஆம்
                  </Heading>
                </div>
                <div
                  className="testa-option-container"
                  onClick={() => handleAnswer(1)}
                >
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
              <div className="testa-picture-container">
                <Image
                  src={img}
                  alt="picture"
                  boxSize="auto"
                  width="100%"
                  height="100%"
                  borderRadius="30px"
                />
              </div>
            </div>
          </div>
          <div className="testa-data-container">
            <div className="testa-databox levelname">
              <Heading size="lg" color="teal">
                ஒலி: {testData?.[qno]["name"]}
              </Heading>
            </div>
            <div className="testa-databox trial">
              <Heading size="lg" color="teal">
                சோதனை {tno}/3
              </Heading>
            </div>
            <div className="testa-databox question-number">
              <Heading size="lg" color="teal">
                கேள்வி எண்: {qno}/{testData?.length - 1}
              </Heading>
            </div>
            <div className="testa-databox point">
              <Heading size="lg" color="teal">
                மொத்த மதிப்பெண்: {points}/{(testData?.length - 1) * 3}
              </Heading>
            </div>
            <div className="testa-databox exit-buttons">
              <div className="testa-exitbtn exitbtn-red">
                <Heading
                  color="rgb(244, 254, 255)"
                  size="lg"
                  onClick={() => handleSubmit()}
                >
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
