import { useState, useEffect } from "react";

const useAudio = (url) => {
  const fetchurl = async (audiopath) => {
    try {
      const response = await fetch(audiopath);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      return url;
    } catch (error) {
      console.error("Error fetching audio file:", error);
    }
  };
  const [audio] = useState(new Audio(fetchurl(url)));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

export default useAudio;
