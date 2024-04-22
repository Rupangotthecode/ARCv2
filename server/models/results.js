import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  loginId: { type: String, required: true },
  studentName: { type: String, required: true },
  testName: {
    type: String,
    required: true,
  },
  testCode: { type: String, required: true },
  testLevel: { type: Number, required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  testDetails: [
    {
      question1: { type: String },
      question2: { type: String },
      t1: { type: Boolean },
      t2: { type: Boolean },
      t3: { type: Boolean },
    },
  ],
});

export default mongoose.model("Result", resultSchema);
