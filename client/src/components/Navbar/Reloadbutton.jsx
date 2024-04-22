import React from "react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const ReloadButton = (props) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Button variant="solid" colorScheme={props.color} onClick={handleReload}>
      <FontAwesomeIcon icon={faRotateLeft} />
    </Button>
  );
};

export default ReloadButton;
