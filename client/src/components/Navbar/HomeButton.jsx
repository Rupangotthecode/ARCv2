import React from "react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HomeButton = (props) => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/Home");
  };

  return (
    <Button variant="solid" colorScheme={props.color} onClick={handleHome}>
      <FontAwesomeIcon icon={faHouse} />
    </Button>
  );
};

export default HomeButton;
