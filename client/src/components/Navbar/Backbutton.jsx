import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = (props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  return (
    <Button variant="solid" colorScheme={props.color} onClick={handleGoBack}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </Button>
  );
};

export default BackButton;
