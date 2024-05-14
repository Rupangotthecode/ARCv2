import { Button, Heading, useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TranScr from "../TranScr/TranScr";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./TestB.css";
import {
  submitResultB,
  handleSubmit,
  playpause,
  handleAnswer,
  updateResArray,
  streamAudio,
  randomizeAnswer,
} from "../../../utils/TestUtils";

const TestB = (props) => {
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
  const [aud1, setAud1] = useState({
    audio: null,
    isPlaying: false,
  });
  const [aud2, setAud2] = useState({
    audio: null,
    isPlaying: false,
  });
  const [audTracker, setAudTracker] = useState(1);
  const [qno, setqno] = useState(1);
  const [tno, settno] = useState(1);
  const [correctAns, setCorrectAns] = useState();
  const [points, setPoints] = useState(0);
  const [trial, setTrial] = useState(true);
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
    if (!props.amal) {
      randomizeAnswer(setCorrectAns);
    } else {
      randomizeAnswer(setCorrectAns, true);
    }
  }, [tno, setCorrectAns, props]);

  useEffect(() => {
    if (!props.amal) {
      streamAudio(
        testData,
        qno,
        correctAns,
        User?.result.volume,
        setAud1,
        setAud2
      );
    } else {
      streamAudio(testData, qno, correctAns, User?.result.volume, setAud1);
    }
  }, [qno, testData, correctAns, props, User]);

  useEffect(() => {
    if (testData?.[qno]["name"] && questionStatusRef.current) {
      updateResArray(
        setResArray,
        questionStatusRef,
        testData,
        qno,
        setQuestionStatus
      );
    }
  }, [qno, setResArray, testData]);

  useEffect(() => {
    // This effect will be triggered whenever resArray is updated.

    if (submit && User?.result?._id && !isSubmitted) {
      submitResultB(
        User,
        testData,
        points,
        location,
        dispatch,
        props.level,
        resArray,
        navigate
      );
    }
  }, [
    submit,
    User,
    isSubmitted,
    testData,
    points,
    location,
    dispatch,
    props,
    resArray,
    navigate,
  ]);

  return (
    <>
      {props.jsonData && (
        <div className="testb-main-container">
          {showTransScr && (
            <TranScr
              trial={trial}
              button={false}
              description={trial ? "" : "தயாராய் இரு!"}
            />
          )}

          <div className="testb-question-container">
            <div className="testb-questionTop-container">
              <Heading size="xl" color="rgb(244, 254, 255)">
                2 ஒலிகளும் வேறுபட்டதா?
              </Heading>
            </div>
            <div className="testb-questionBottom-container">
              <div className="testb-input-container">
                <div
                  className="testb-option-container"
                  onClick={() =>
                    handleAnswer(
                      0,
                      setQuestionStatus,
                      testData,
                      qno,
                      correctAns,
                      setPoints,
                      tno,
                      questionStatus,
                      resultToast,
                      resArray,
                      setqno,
                      settno,
                      setTrial,
                      aud1,
                      aud2,
                      setAud1,
                      setAud2,
                      setShowTransScr,
                      props.amal
                    )
                  }
                >
                  <Heading size="xl" color="rgb(244, 254, 255)">
                    ஆம்
                  </Heading>
                </div>
                <div
                  className="testb-option-container"
                  onClick={() =>
                    handleAnswer(
                      1,
                      setQuestionStatus,
                      testData,
                      qno,
                      correctAns,
                      setPoints,
                      tno,
                      questionStatus,
                      resultToast,
                      resArray,
                      setqno,
                      settno,
                      setTrial,
                      aud1,
                      aud2,
                      setAud1,
                      setAud2,
                      setShowTransScr,
                      props.amal,
                      User,
                      setResArray,
                      setSubmit,
                      setIsSubmitted
                    )
                  }
                >
                  <Heading size="xl" color="rgb(244, 254, 255)">
                    இல்லை
                  </Heading>
                </div>
              </div>
              <div className="testb-play-container">
                <div
                  className="testb-play-button"
                  onClick={() =>
                    props.amal
                      ? playpause(aud1, setAud1)
                      : playpause(
                          aud1,
                          setAud1,
                          aud2,
                          setAud2,
                          audTracker,
                          setAudTracker
                        )
                  }
                >
                  {aud1.isPlaying || aud2.isPlaying ? (
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
              <div className="testb-picture-container">
                <Heading
                  size="lg"
                  color="rgb(155, 129, 191)"
                  textAlign="center"
                >
                  இந்த தேர்வுக்கு காட்சி குறிப்பு இல்லை
                </Heading>
              </div>
            </div>
          </div>
          <div className="testb-data-container">
            <div className="testb-databox levelname">
              <Heading size="lg" color="rgb(119, 82, 171)" textAlign="center">
                ஒலி: {testData?.[qno]["name"]}
              </Heading>
            </div>
            <div className="testb-databox trial">
              <Heading size="lg" color="rgb(119, 82, 171)">
                சோதனை {tno}/3
              </Heading>
            </div>
            <div className="testb-databox question-number">
              <Heading size="lg" color="rgb(119, 82, 171)">
                கேள்வி எண்: {qno}/{testData?.length - 1}
              </Heading>
            </div>
            <div className="testb-databox point">
              <Heading size="lg" color="rgb(119, 82, 171)">
                மொத்த மதிப்பெண்: {points}/{(testData?.length - 1) * 3}
              </Heading>
            </div>
            <div className="testb-databox exit-buttons">
              <div
                className="testb-exitbtn exitbtn-red"
                onClick={() => openModalsubmit()}
              >
                <Heading color="rgb(244, 254, 255)" size="lg">
                  சமர்ப்பிக்கவும்
                </Heading>
              </div>
              <div
                className="testb-exitbtn"
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
                  <ModalHeader color="rgb(119, 82, 171)">
                    சோதனை சமர்ப்பிக்க?
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody color="rgb(119, 82, 171)">
                    சோதனையைச் சமர்ப்பிக்க விரும்புகிறீர்களா?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="purple"
                      mr={3}
                      variant="ghost"
                      onClick={closeModalsubmit}
                    >
                      மூடவும் தொடரவும்
                    </Button>
                    <Button
                      colorScheme="purple"
                      mr={3}
                      onClick={() =>
                        handleSubmit(
                          User,
                          setResArray,
                          questionStatus,
                          setSubmit,
                          setIsSubmitted
                        )
                      }
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
                  <ModalHeader color="rgb(119, 82, 171)">
                    வெளியேறும் சோதனை?
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody color="rgb(119, 82, 171)">
                    தேர்வில் இருந்து வெளியேற விரும்புகிறீர்களா?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="purple"
                      mr={3}
                      variant="ghost"
                      onClick={closeModalexit}
                    >
                      மூடவும் தொடரவும்
                    </Button>
                    <Button
                      colorScheme="purple"
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

export default TestB;
