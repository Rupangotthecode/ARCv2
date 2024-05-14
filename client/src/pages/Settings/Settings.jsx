import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { changeVolume } from "../../actions/auth";
import ting from "./ting.mp3";
import "./Settings.css";

const Settings = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const User = useSelector((state) => state.currentUserReducer)?.result;
  const userId = User?._id;
  const userVolume = User?.volume;
  const dispatch = useDispatch();
  const handleVolumeChange = (userId, volume) => {
    const ting_audio = new Audio(ting);
    ting_audio.volume = volume / 100;
    ting_audio.play();
    dispatch(changeVolume(userId, volume));
  };
  const handleSliderChange = (v) => {
    setSliderValue(v);
  };
  return (
    <div className="settings-main-container">
      <Navbar heading="teal" button="teal" />
      <div className="settings-content-container">
        <Heading size="2xl" color="teal">
          வால்யூம் அமைப்புகள்
        </Heading>
        <div className="settings-slider-container">
          <Slider
            id="slider"
            defaultValue={userVolume}
            min={0}
            max={100}
            colorScheme="teal"
            onChange={(v) => handleSliderChange(v)}
            onChangeEnd={(v) => handleVolumeChange(userId, v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue}%`}
              fontSize="x-large"
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Settings;
