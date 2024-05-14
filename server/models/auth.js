import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  loginID: { type: String, required: true },
  parentQues: [
    {
      question: String,
      answer: String,
    },
  ],
  unlocks: {
    A_1: { type: Number, default: 1 },
    A_2: { type: Number, default: 0 },
    A_3: { type: Number, default: 0 },
    B_1: { type: Number, default: 0 },
    B_2: { type: Number, default: 0 },
    B_3: { type: Number, default: 0 },
    B_4: { type: Number, default: 0 },
  },
  results: [{ type: String }],
  volume: { type: Number, default: 50 },
});

export default mongoose.model("User", userSchema);
