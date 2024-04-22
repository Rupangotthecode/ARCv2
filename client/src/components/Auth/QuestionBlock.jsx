import React from "react";
import { RadioGroup, Stack, Radio, Heading } from "@chakra-ui/react";

const questionBlock = (props) => {
  return (
    <div className="qb-container">
      <Heading size="md" fontWeight="normal">
        {props.question}
      </Heading>
      <RadioGroup
        borderColor="#9452f7"
        value={props.value}
        onChange={(e) => props.onchangeFunc(props.id, e)}
      >
        <Stack direction="row" spacing="18px">
          <Radio value="ஒப்புக்கொள்" colorScheme="purple">
            ஒப்புக்கொள்
          </Radio>
          <Radio value="இருக்கலாம்" colorScheme="purple">
            இருக்கலாம்
          </Radio>
          <Radio value="கருத்து வேறுபாடு" colorScheme="purple">
            கருத்து வேறுபாடு
          </Radio>
        </Stack>
      </RadioGroup>
    </div>
  );
};

export default questionBlock;
