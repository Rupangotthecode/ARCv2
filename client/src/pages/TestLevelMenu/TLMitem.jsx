import { Heading, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TestLevelMenu.css";

const TLMitem = ({ User, item, parameter }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const handleClick = () => {
    navigate(item.path);
  };
  return (
    <>
      {User && (
        <div
          className="tlmi-main-box"
          style={{
            opacity: User?.unlocks?.[parameter] >= item.level ? 1 : 0.4,
          }}
          onClick={
            User?.unlocks[parameter] >= item.level
              ? handleClick
              : () => {
                  toast({
                    title: "நிலை திறக்கப்படவில்லை",
                    status: "error",
                    isClosable: true,
                  });
                }
          }
        >
          <Heading>நிலை {item.level}</Heading>
          <Heading>{item.description}</Heading>
        </div>
      )}
    </>
  );
};

export default TLMitem;
