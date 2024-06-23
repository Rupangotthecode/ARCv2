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
  if (filterObj.testName) {
    filteredResults = results.filter(
      (result) => result.testName === filterObj.testName
    );
  }
  return filteredResults;
};
