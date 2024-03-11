import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";

export const signup = async (req, res) => {
  const { loginID, name, dob, gender, password } = req.body;
  try {
    const existinguser = await users.findOne({ loginID });
    if (existinguser) {
      return res.status(404).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name: name,
      dob: dob,
      gender: gender,
      password: hashedPassword,
      loginID: loginID,
    });
    const token = jwt.sign(
      { name: newUser.name, id: newUser.loginID },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { loginID, password } = req.body;
  console.log(loginID, password);
  try {
    const existinguser = await users.findOne({ loginID });
    if (!existinguser) {
      return res.status(404).json({ message: "User doesn't Exist." });
    } else {
      const isPasswordCrt = await bcrypt.compare(
        password,
        existinguser.password
      );
      if (!isPasswordCrt) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { name: existinguser.name, id: existinguser.loginID },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: existinguser, token });
    }
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const parentQuesSubmit = async (req, res) => {
  const { id, quesArray } = req.body;
  try {
    const existinguser = await users.findById(id);
    quesArray.forEach((obj) => {
      const tempObj = {
        question: obj.question,
        answer: obj.value,
      };
      existinguser.parentQues.push(tempObj);
    });
    await users.findByIdAndUpdate(id, existinguser);
    res.status(200).json({ result: existinguser });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
