import React, { useEffect, useState } from "react";
import "./SearchTool.css";
import {
  filterResults,
  retrieveNamesFromResults,
} from "../../utils/SearchToolUtils";
import { Button, Divider, Heading, Select, Stack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setResultsWithFilter } from "../../actions/results";

const SearchTool = (props) => {
  const testNames = retrieveNamesFromResults(props?.results);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState({
    testName: null,
    testDate: null,
    testScore: null,
  });
  const handleFilter = (e, name) => {
    setSelectedFilter((prev) => ({ ...prev, [name]: e.target.value }));
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
      <div
        className="srt-content-container"
        onChange={(e) => handleFilter(e, "testName")}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <Select placeholder="Select option">
              {testNames?.map((testName) => (
                <option value={testName}>{testName}</option>
              ))}
            </Select>
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
