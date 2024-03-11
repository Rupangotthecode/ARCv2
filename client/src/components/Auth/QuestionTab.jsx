import React, { useState } from "react";
import QuestionBlock from "./QuestionBlock";
import "./QuestionTab.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postParentQues } from "../../actions/auth";

const QuestionTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const [inputValues, setInputValues] = useState([
    {
      id: 1,
      value: "",
      question:
        "உங்கள் குழந்தை புதியவர்களை சந்திக்கும் பொழுது கேட்கும் பிரச்சனை சங்கடத்தை ஏற்படுதிகிரதா?",
    },
    {
      id: 2,
      value: "",
      question:
        "உங்கள் குழந்தை குடும்ப உறுப்பினர்களுடன் பேசும் பொழுது கேட்கும் பிரச்சனை விரக்தியை ஏற்படுத்துமா?",
    },
    {
      id: 3,
      value: "",
      question:
        "காது கேளாமை உங்கள் குழந்தைக்கு குடும்ப உறுப்பினர்களுடன் வாக்குவாதத்தை ஏற்படுத்துமா?",
    },
    {
      id: 4,
      value: "",
      question:
        "உங்கள் குழந்தைக்கு சக ஊழியர்கள், வாடிக்கையாளர்கள்/ வாடிக்கையாளர்கள் அல்லது காத்திருப்பு பணியாளர்கள் கேட்பதில்/புரிந்து கொள்வதில் சிரமம் உள்ளதா?",
    },
    {
      id: 5,
      value: "",
      question:
        "செவித்திறன் பிரச்சனை மூலம் உங்கள் குழந்தை குறிப்பிடத்தக்க அளவில் பின்தங்கியதாக உணர்கிறாரா?",
    },
    {
      id: 6,
      value: "",
      question:
        "கேட்கும் பிரச்சனை உங்கள் குழந்தைக்கு நண்பர்கள், உறவினர்கள் அல்லது அண்டை வீட்டார் வருகை தரும் போது சிரமத்தை ஏற்படுத்துமா?",
    },
    {
      id: 7,
      value: "",
      question:
        "காது கேளாமை உங்கள் குழந்தைக்கு திரைப்படங்கள் அல்லது திரையரங்கில் காது கேட்கும் பிரச்சனையை ஏற்படுத்துமா",
    },
    {
      id: 8,
      value: "",
      question:
        "காது கேளாமை உங்கள் குழந்தைக்கு டிவி அல்லது வானொலியில் கேட்கும் போது சிரமத்தை ஏற்படுத்துமா?",
    },
    {
      id: 9,
      value: "",
      question:
        "உங்கள் குழந்தை தனது கேட்கும் வரம்பில் ஏதேனும் சிரமம் இருப்பதாக உணர்கிறார்களா அல்லது அவர்களின் தனிப்பட்ட அல்லது சமூக வாழ்க்கை தடைபடுகிறதா?",
    },
    {
      id: 10,
      value: "",
      question:
        "காது கேளாமை உங்கள் குழந்தைக்கு உறவினர்கள் அல்லது நண்பர்களுடன் உணவகத்தில் இருக்கும் பொழுது சிரமத்தை ஏற்படுத்துமா?",
    },
  ]);

  const handleInputChange = (id, value) => {
    setInputValues((prevValues) =>
      prevValues.map((item) =>
        item.id === id ? { ...item, value: value } : item
      )
    );
  };

  const handleSubmit = (e) => {
    dispatch(postParentQues(User.result._id, inputValues, navigate));
  };

  return (
    <div className="qt-main-container">
      <div className="qt-content-container">
        {inputValues.map((questionData, index) => (
          <QuestionBlock
            key={index}
            id={questionData.id}
            value={questionData.value}
            question={questionData.question}
            onchangeFunc={handleInputChange}
          />
        ))}
      </div>
      <div className="qt-button-container">
        <Button type="submit" onClick={() => handleSubmit()} width="30%">
          Save Responses
        </Button>
      </div>
    </div>
  );
};

export default QuestionTab;
