export const retrieveNamesFromResults = (results) => {
  let testNameArray = [];
  results.forEach((result) => {
    let testName = result.testName;
    testNameArray.push(testName);
  });
  return [...new Set(testNameArray)];
};

export const filterResults = (results, filterObj) => {
  console.log(filterObj, results);
  let filteredResults = [];
  if (filterObj.testName?.length > 0) {
    filterObj.testName.forEach((filterName) => {
      let tempFiltered = results.filter(
        (result) => result.testName === filterName
      );
      tempFiltered.forEach((result) => {
        filteredResults.push(result);
      });
    });
    console.log("Filteerd:", filteredResults);
  }
  if (filterObj.testScore?.length > 0) {
    if (filteredResults.length > 0) {
      filteredResults = filteredResults.filter((result) => {
        let scorePercentage = (result.score / result.totalScore) * 100;
        return (
          scorePercentage >= filterObj.testScore[0] &&
          scorePercentage <= filterObj.testScore[1]
        );
      });
    } else {
      filteredResults = results.filter((result) => {
        let scorePercentage = (result.score / result.totalScore) * 100;
        return (
          scorePercentage >= filterObj.testScore[0] &&
          scorePercentage <= filterObj.testScore[1]
        );
      });
    }
  } else {
    return results;
  }
  return filteredResults;
};
