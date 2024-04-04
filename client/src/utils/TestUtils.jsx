import { submitResults } from "../actions/results";
import { flushSync } from "react-dom";

export const submitResultA = (
  User,
  testData,
  points,
  location,
  dispatch,
  level,
  resArray,
  navigate
) => {
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
  if (location.pathname.includes("diffsounds")) {
    testName = "செவிவழி வேறுபாடு - ஒலிகலின் வேறுபாட்டை அறிக";
    testCode = "A_1";
  } else if (location.pathname.includes("speech")) {
    testName = "செவிவழி வேறுபாடு - தமிழ் சத்தங்களை அறிக";
    testCode = "A_2";
  }
  if (location.pathname.includes("communication")) {
    testName = "செவிவழி வேறுபாடு - சொல்லின் தொடர்பு நோக்கத்தின் வேறுபாடு";
    testCode = "A_3";
  }

  // Dispatch the action with the updated values
  dispatch(
    submitResults(
      User.result._id,
      User.result.loginID,
      User.result.name,
      points,
      passed,
      testName,
      testCode,
      level,
      resArray,
      navigate
    )
  );
};

export const submitResultB = (
  User,
  testData,
  points,
  location,
  dispatch,
  level,
  resArray,
  navigate
) => {
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
  if (location.pathname.includes("diffsounds")) {
    testName = "செவிவழி வேறுபாடு - ஒலிகலின் வேறுபாட்டை அறிக";
    testCode = "B_1";
  } else if (location.pathname.includes("speech")) {
    testName = "செவிவழி வேறுபாடு - தமிழ் சத்தங்களை அறிக";
    testCode = "B_2";
  } else if (location.pathname.includes("communication")) {
    testName = "செவிவழி வேறுபாடு - சொல்லின் தொடர்பு நோக்கத்தின் வேறுபாடு";
    testCode = "B_3";
  } else if (location.pathname.includes("pronunciation")) {
    testName = "செவிவழி வேறுபாடு - பின்னணி இரைச்சலுடன்";
    testCode = "B_4";
  }

  // Dispatch the action with the updated values
  dispatch(
    submitResults(
      User.result._id,
      User.result.loginID,
      User.result.name,
      points,
      passed,
      testName,
      testCode,
      level,
      resArray,
      navigate
    )
  );
};

export const handleSubmit = (
  User,
  setResArray,
  questionStatus,
  setSubmit,
  setIsSubmitted
) => {
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

export const playpause = (
  variable1,
  setVariable1,
  variable2,
  setVariable2,
  audTracker,
  setAudTracker
) => {
  const playState1 = variable1.isPlaying;
  const playState2 = variable2.isPlaying;
  if (playState1 && variable1?.audio?.readyState >= 2) {
    console.log("Pausing Audio");
    try {
      variable1.audio?.pause();
      setVariable1((prevState) => ({ ...prevState, isPlaying: false }));
    } catch (error) {
      console.log("Error while pausing audio:", error);
    }
  } else if (playState2 && variable2?.audio?.readyState >= 2) {
    console.log("Pausing Audio");
    try {
      variable2.audio?.pause();
      setVariable2((prevState) => ({ ...prevState, isPlaying: false }));
      setAudTracker(2);
    } catch (error) {
      console.log("Error while pausing audio:", error);
    }
  } else if (audTracker === 1) {
    console.log("Playing Audio:", variable1?.audio);
    try {
      variable1.audio?.play();
      setVariable1((prevState) => ({ ...prevState, isPlaying: true }));
      variable1.audio?.addEventListener("ended", () => {
        setVariable1((prevState) => ({ ...prevState, isPlaying: false }));
        try {
          variable2.audio?.play();
          setVariable2((prevState) => ({ ...prevState, isPlaying: true }));
          variable2.audio?.addEventListener("ended", () => {
            console.log("hello");
            setAudTracker(1);
            setVariable1((prevState) => ({ ...prevState, isPlaying: false }));
            setVariable2((prevState) => ({ ...prevState, isPlaying: false }));
            variable2.audio?.removeEventListener("ended", () => {
              console.log("removed listener");
            });
          });
        } catch (error) {
          console.log("Error while play audio:", error);
        }
        variable1.audio?.removeEventListener("ended", () => {
          console.log("removed listener");
        });
      });
    } catch (error) {
      console.log("Error while playing audio:", error);
    }
  } else {
    try {
      variable2.audio?.play();
      setVariable2((prevState) => ({ ...prevState, isPlaying: true }));
      variable2.audio?.addEventListener("ended", () => {
        console.log("hello");
        setAudTracker(1);
        setVariable1((prevState) => ({ ...prevState, isPlaying: false }));
        setVariable2((prevState) => ({ ...prevState, isPlaying: false }));
        variable2.audio?.removeEventListener("ended", () => {
          console.log("removed listener");
        });
      });
    } catch (error) {
      console.log("Error while play audio:", error);
    }
  }
};

export const handleAnswer = (
  answer,
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
  setShowTransScr
) => {
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
  aud1?.audio?.pause();
  setAud1((prevState) => ({
    ...prevState,
    isPlaying: false,
  }));

  aud2?.audio?.pause();
  setAud2((prevState) => ({
    ...prevState,
    isPlaying: false,
  }));
  setShowTransScr(true);

  setTimeout(() => {
    setShowTransScr(false);
    setTrial(true);
  }, 2500);
};

export const updateResArray = (
  setResArray,
  questionStatusRef,
  testData,
  qno,
  setQuestionStatus
) => {
  setResArray((prevState) => [...prevState, questionStatusRef.current]);
  console.log("resArray updated", testData?.[qno]["name"]);
  setQuestionStatus((prevQuestionStatus) => ({
    ...prevQuestionStatus,
    question1: testData?.[qno]["name"],
    t1: false,
    t2: false,
    t3: false,
  }));
};

export const streamAudio = (testData, qno, setAud1, correctAns, setAud2) => {
  const audioLink1 = testData?.[qno]["audio1"];
  const encodedAudLink1 = encodeURIComponent(audioLink1);
  const completeAudLink1 = "http://localhost:5000/audio/get/" + encodedAudLink1;
  setAud1((prevState) => {
    const audio = new Audio(completeAudLink1);
    audio.onerror = () => {
      console.error("Audio load error");
    };
    return { ...prevState, audio };
  });
  let audioLink2 = "";
  if (correctAns) {
    audioLink2 = testData?.[qno]["audio1"];
  } else {
    audioLink2 = testData?.[qno]["audio2"];
  }
  const encodedAudLink2 = encodeURIComponent(audioLink2);
  const completeAudLink2 = "http://localhost:5000/audio/get/" + encodedAudLink2;
  setAud2((prevState) => {
    const audio = new Audio(completeAudLink2);
    audio.onerror = () => {
      console.error("Audio load error");
    };
    return { ...prevState, audio };
  });
};

export const randomizeAnswer = (setCorrectAns) => {
  const randomNum = Math.floor(Math.random() * 1000);
  console.log(randomNum);
  if (randomNum % 2 === 0) {
    setCorrectAns(1);
  } else {
    setCorrectAns(0);
  }
};
