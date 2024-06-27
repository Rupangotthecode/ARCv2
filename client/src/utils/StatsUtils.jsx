let colours = ["red", "green", "blue", "brown", "pink"];

const checkTestPresence = (testname, testArray) => {
  return testArray.find((test) => test.testName === testname) || -1;
};

export const createRadarChartData = (results) => {
  let radarData = [];
  results.forEach((result) => {
    let testName = result.testName;
    let testCode = result.testCode;
    let testPercentage = (result.score / result.totalScore) * 100;
    let testFound = checkTestPresence(testName, radarData);

    if (testFound === -1) {
      radarData.push({
        testName: testName,
        testCode: testCode,
        testAvgScore: testPercentage,
        NoOfTest: 1,
      });
    } else {
      let testIndex = radarData.findIndex((test) => test === testFound);
      testFound["testAvgScore"] =
        (testFound["testAvgScore"] * testFound["NoOfTest"] + testPercentage) /
        (testFound["NoOfTest"] + 1);
      testFound["NoOfTest"] += 1;
      radarData[testIndex] = testFound;
    }
  });
  return radarData;
};

export const createTestPieData = (results) => {
  let testPieData = [];
  let i = 0;
  results.forEach((result) => {
    let testCode = result.testCode;
    let testFound = checkTestPresence(testCode, testPieData);
    if (testFound === -1) {
      testPieData.push({
        testName: testCode,
        testCounter: 1,
        colour: colours[i],
      });
      i += 1;
    } else {
      testFound["testCounter"] += 1;
    }
  });
  return testPieData;
};

export const createTestLevelData = (results) => {
  let levelPieData = [];
  let i = 0;
  results.forEach((result) => {
    let levelCode = "level " + String(result.testLevel);
    let testFound = checkTestPresence(levelCode, levelPieData);
    if (testFound === -1) {
      levelPieData.push({
        testName: levelCode,
        testCounter: 1,
        colour: colours[i],
      });
      i += 1;
    } else {
      testFound["testCounter"] += 1;
    }
  });
  return levelPieData;
};

export const createLineChartData = (results) => {
  let lineData = [];
  results.forEach((result) => {
    let date = result.date;
    let percentageScore = (result.score / result.totalScore) * 100;
    percentageScore = percentageScore.toFixed(2);
    let testCode = result.testCode;

    lineData.push({
      date: date,
      percentageScore: percentageScore,
      testCode: testCode,
    });
  });
  return lineData;
};
