import Users from "../models/auth.js";
import result from "../models/results.js";
import results from "../models/results.js";
import { convertDate } from "../utils/date_utils.js";
import { manageUnlocks } from "../utils/results_utils.js";

export const submitResults = async (req, res) => {
  try {
    const {
      id,
      loginID,
      name,
      score,
      totalScore,
      passed,
      testName,
      testCode,
      testLevel,
      testData,
    } = req.body;

    const new_result = new result({
      userId: id,
      date: convertDate(Date.now()),
      loginId: loginID,
      studentName: name,
      testName: testName,
      testCode: testCode,
      testLevel: testLevel,
      score: score,
      totalScore: totalScore,
      passed: passed,
      testDetails: testData,
    });
    await new_result.save();
    let user = await Users.findById(id);
    if (passed) {
      user = manageUnlocks(user, testCode, testLevel);
    }
    user.results.push(new_result._id);
    await Users.findByIdAndUpdate(id, user);
    res.status(200).json({
      message: "Result Submitted Successfully",
      resId: new_result._id,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(`Error in submitting results: ${error}`);
  }
};

export const getResultWithId = async (req, res) => {
  try {
    const result_id = req.params.resultId;
    const result = await results.findById(result_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const userId = req.params.userId;
    const resultsList = await results.find({ userId: userId });
    res.status(200).json(resultsList);
  } catch (error) {
    res.status(400).message("error finding results:", error.message);
  }
};
