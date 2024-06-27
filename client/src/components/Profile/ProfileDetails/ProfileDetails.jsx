import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { calculateAge } from "../../../utils/ProfileUtils";
import "./ProfileDetails.css";

const ProfileDetails = (props) => {
  return (
    <div className="pd-main-container">
      <Flex>
        <Heading size="md" color="teal">
          குழந்தையின் பெயர்:
        </Heading>
        <Heading size="md" color="rgb(0, 205, 205)" fontWeight="medium">
          {props.user.name}
        </Heading>
      </Flex>
      <Flex>
        <Heading size="md" color="teal">
          குழந்தையின் வயது (Age):
        </Heading>
        <Heading size="md" color="rgb(0, 205, 205)" fontWeight="medium">
          {calculateAge(props.user.dob)}
        </Heading>
      </Flex>
      <Flex>
        <Heading size="md" color="teal">
          பயனர் பெயர் (Username):
        </Heading>
        <Heading size="md" color="rgb(0, 205, 205)" fontWeight="medium">
          {props.user.loginID}
        </Heading>
      </Flex>
      <Flex>
        <Heading size="md" color="teal">
          பிறந்த தேதி (DOB):
        </Heading>
        <Heading size="md" color="rgb(0, 205, 205)" fontWeight="medium">
          {props.user.dob}
        </Heading>
      </Flex>
      <Flex>
        <Heading size="md" color="teal">
          குழந்தையின் பாலினம் (Gender) :
        </Heading>
        <Heading size="md" color="rgb(0, 205, 205)" fontWeight="medium">
          {props.user.gender}
        </Heading>
      </Flex>
    </div>
  );
};

export default ProfileDetails;
