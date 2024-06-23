import { Button, Heading, Image, useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./TestA.css";
import TranScr from "../TranScr/TranScr";
import { submitResults } from "../../../actions/results";
import { flushSync } from "react-dom";

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
  const [questionStatus, setQuestionStatus] = useState();
  const [isModalsubmitOpen, setModalsubmitOpen] = useState(false);
  const [isModalexitOpen, setModalexitOpen] = useState(false);
  const [submit, setSubmit] = useState(false);

  const openModalsubmit = () => setModalsubmitOpen(true);
  const closeModalsubmit = () => setModalsubmitOpen(false);

  const openModalexit = () => setModalexitOpen(true);
  const closeModalexit = () => setModalexitOpen(false);

  const questionStatusRef = useRef(questionStatus);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    questionStatusRef.current = questionStatus;
  }, [questionStatus]);

  useEffect(() => {
    const audioLink = testData?.[qno]["audio"];
    const encodedAudLink = encodeURIComponent(audioLink);
    const completeAudLink = "http://localhost:5000/audio/get/" + encodedAudLink;
    setAud((prevState) => {
      const audio = new Audio(completeAudLink);
      audio.onerror = () => {
        console.error("Audio load error");
      };
      return { ...prevState, audio };
    });
    const imgLink = testData?.[qno]["v_cue"];
    const encodedImgLink = encodeURIComponent(imgLink);
    const completeImgLink = "http://localhost:5000/image/get/" + encodedImgLink;
    setImg(completeImgLink);
    console.log(testData);
    if (testData?.[qno]["name"] && questionStatusRef.current) {
      setResArray((prevState) => [...prevState, questionStatusRef.current]);
      console.log("resArray updated", testData?.[qno]["name"]);
      setQuestionStatus((prevQuestionStatus) => ({
        ...prevQuestionStatus,
        question1: testData?.[qno]["name"],
        t1: false,
        t2: false,
        t3: false,
      }));
    }
  }, [qno, testData, User]);

  const handleAnswer = (answer) => {
    setQuestionStatus((prevQuestionStatus) => ({
      ...prevQuestionStatus,
      question1: testData?.[qno]["name"],
    }));
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
        console.log("Here");
        setQuestionStatus((prevState) => ({
          ...prevState,
          t3: true,
        }));
        console.log(questionStatus);
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
    console.log("ResArray", resArray);
    if (tno === 3) {
      if (qno === testData?.length - 1) {
        flushSync(() => {
          handleSubmit();
        });
      } else {
        setqno((prevValue) => prevValue + 1);
        settno(0);
        setTrial(false);
      }
    }
    settno((prevtno) => prevtno + 1);
    aud?.audio?.pause();
    setAud((prevState) => ({
      ...prevState,
      isPlaying: false,
    }));
    setShowTransScr(true);

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
            if (variable?.audio) {
              variable.audio.volume = User?.result.volume / 100;
            }
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
    if (User?.result?._id) {
      flushSync(() => {
        console.log("resArray in submit");
        setResArray((prevState) => [...prevState, questionStatus]);
      });
      flushSync(() => {
        setSubmit((prevState) => !prevState);
      });
      flushSync(() => {
        setIsSubmitted((prev) => !prev);
      });
    }
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

  useEffect(() => {
    // This effect will be triggered whenever resArray is updated.

    if (submit && User?.result?._id && !isSubmitted) {
      console.log(
        "inside UE condition",
        User.result._id,
        User.result.loginID,
        User.result.name
      );
      let passed = false;
      let testName = "";
      let testCode = "";

      // Calculate points and set testName and testCode based on location.pathname
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

      // Dispatch the action with the updated values
      dispatch(
        submitResults(
          User.result._id,
          User.result.loginID,
          User.result.name,
          points,
          (testData?.length - 1) * 3,
          passed,
          testName,
          testCode,
          props.level,
          resArray,
          navigate
        )
      );
    }
  }, [
    resArray,
    points,
    testData,
    location.pathname,
    dispatch,
    navigate,
    props.level,
    User.result._id,
    User.result.loginID,
    User.result.name,
    qno,
    tno,
    submit,
    User,
    questionStatus,
    isSubmitted,
  ]);

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
                {props.level === 1 ? (
                  <Image
                    src={img}
                    alt="picture"
                    boxSize="auto"
                    width="100%"
                    height="100%"
                    borderRadius="30px"
                  />
                ) : (
                  <Heading size="lg" color="teal" textAlign="center">
                    இந்த தேர்வுக்கு காட்சி குறிப்பு இல்லை
                  </Heading>
                )}
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
              <div
                className="testa-exitbtn exitbtn-red"
                onClick={() => openModalsubmit()}
              >
                <Heading color="rgb(244, 254, 255)" size="lg">
                  சமர்ப்பிக்கவும்
                </Heading>
              </div>
              <div
                className="testa-exitbtn"
                onClick={() => openModalexit()}
                style={{ backgroundColor: "orangered" }}
              >
                <Heading color="rgb(244, 254, 255)" size="lg">
                  வெளியேறு
                </Heading>
              </div>
              <Modal
                isOpen={isModalsubmitOpen}
                onClose={closeModalsubmit}
                isCentered
                height="300px"
                width="300px"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>சோதனை சமர்ப்பிக்க?</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    சோதனையைச் சமர்ப்பிக்க விரும்புகிறீர்களா?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="teal"
                      mr={3}
                      variant="ghost"
                      onClick={closeModalsubmit}
                    >
                      மூடவும் தொடரவும்
                    </Button>
                    <Button
                      colorScheme="teal"
                      mr={3}
                      onClick={() => handleSubmit()}
                    >
                      ஆம், சமர்ப்பிக்கவும்
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={isModalexitOpen}
                onClose={closeModalexit}
                isCentered
                height="300px"
                width="300px"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>வெளியேறும் சோதனை?</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    தேர்வில் இருந்து வெளியேற விரும்புகிறீர்களா?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="teal"
                      mr={3}
                      variant="ghost"
                      onClick={closeModalexit}
                    >
                      மூடவும் தொடரவும்
                    </Button>
                    <Button
                      colorScheme="teal"
                      mr={3}
                      onClick={() => navigate("/Home")}
                    >
                      ஆம், வெளியேறு
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestA;
