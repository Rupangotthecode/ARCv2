import React, { useState } from "react";
import "./SearchTool.css";
import {
  filterResults,
  retrieveNamesFromResults,
} from "../../utils/SearchToolUtils";
import {
  Button,
  Divider,
  Heading,
  Checkbox,
  CheckboxGroup,
  Stack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setResultsWithFilter } from "../../actions/results";

const SearchTool = (props) => {
  const [sliderValue, setSliderValue] = useState(5);
  const testNames = retrieveNamesFromResults(props?.results);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState({
    testName: null,
    testDate: null,
    testScore: [0, 100],
  });
  const handleFilter = (e, name) => {
    console.log(e);
    setSelectedFilter((prev) => ({ ...prev, [name]: e }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredResults = filterResults(props.results, selectedFilter);
    dispatch(setResultsWithFilter(filteredResults));
  };
  console.log(testNames);
  return (
    <div className="srt-main-container">
      <div className="srt-header-container">
        <Heading color="teal" size="lg">
          வடிகட்டி முடிவுகள்
        </Heading>
        <Divider borderColor="teal" borderWidth="2px" borderRadius="40px" />
      </div>
      <div className="srt-content-container">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Heading color="teal" size="md" fontWeight="600">
              பெயரால் வடிகட்டவும்
            </Heading>
            <Divider borderColor="teal" borderWidth="1px" borderRadius="40px" />
            <CheckboxGroup
              colorScheme="green"
              onChange={(e) => handleFilter(e, "testName")}
            >
              <Stack spacing={[1, 2]} direction={["column", "column"]}>
                {testNames?.map((testName, index) => (
                  <Checkbox value={testName} key={"checkbox" + index}>
                    {testName}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
            <Heading color="teal" size="md" fontWeight="600" pt="4%">
              மதிப்பெண் % மூலம் வடிகட்டவும்
            </Heading>
            <Divider borderColor="teal" borderWidth="1px" borderRadius="40px" />
            <Box padding="4%" paddingTop="8%">
              <RangeSlider
                defaultValue={[0, 100]}
                onChange={(val) => setSliderValue(val)}
                onChangeEnd={(val) => handleFilter(val, "testScore")}
                ml="2%"
                mr="2%"
              >
                <RangeSliderMark
                  value={25}
                  mt="1"
                  ml="-2.5"
                  fontSize="sm"
                  color="teal"
                >
                  25%
                </RangeSliderMark>
                <RangeSliderMark
                  value={50}
                  mt="1"
                  ml="-2.5"
                  fontSize="sm"
                  color="teal"
                >
                  50%
                </RangeSliderMark>
                <RangeSliderMark
                  value={75}
                  mt="1"
                  ml="-2.5"
                  fontSize="sm"
                  color="teal"
                >
                  75%
                </RangeSliderMark>
                <RangeSliderMark
                  value={sliderValue[0]}
                  textAlign="center"
                  bg="teal"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                  borderRadius="10px"
                >
                  {sliderValue[0]}%
                </RangeSliderMark>
                <RangeSliderMark
                  value={sliderValue[1]}
                  textAlign="center"
                  bg="teal"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                  borderRadius="10px"
                >
                  {sliderValue[1]}%
                </RangeSliderMark>
                <RangeSliderTrack bg="gray.200">
                  <RangeSliderFilledTrack bg="teal" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}></RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}></RangeSliderThumb>
              </RangeSlider>
            </Box>

            {/* <Heading color="teal" size="md" fontWeight="600">
              மதிப்பெண் % மூலம் வடிகட்டவும்
            </Heading>
            <Divider borderColor="teal" borderWidth="1px" borderRadius="40px" />
            <Box padding="4%">
              <Heading color="teal" size="sm" fontWeight="400">
                From
              </Heading>
              <Input
                borderColor="#9452f7"
                type="date"
                onChange={(e) => {
                  handleFilter(e, "testDateFrom");
                }}
              />
              <Heading color="teal" size="sm" fontWeight="400">
                To
              </Heading>
              <Input
                borderColor="#9452f7"
                type="date"
                onChange={(e) => {
                  handleFilter(e, "testDateTo");
                }}
              />
            </Box> */}
            <Button type="submit" colorScheme="teal">
              Apply
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default SearchTool;
