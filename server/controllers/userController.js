import { comparePassword, hashPassword } from "../helpers/userHelper.js";
import userModel from "../models/userModel.js";

// Register Controller------------------------------------------->
export const Register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // validation
    if (!name || !email || !password || !phone) {
      return res.status(404).send({
        success: false,
        message: "Plzz fill all fields",
      });
    }

    // Existing user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: `Dear ${existinguser.name} this ${existinguser.email} Alraey Registered Please Login`,
      });
    }

    const hashedPassword = await hashPassword(password);
    // Save User
    const User = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    }).save();
    res.status(201).send({
      success: "true",
      message: `${User.name} Register Successfully`,
      User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
// Login Controller------------------------------------------->
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(409).send({
        success: false,
        message: "Plzz fill all fields",
      });
    }

    // notexistinguser
    const User = await userModel.findOne({ email });
    if (!User) {
      return res.status(200).send({
        success: false,
        message: "User not exist Plzz register first",
      });
    }

    const match = await comparePassword(password, User.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invailid password",
      });
    }

    res.status(200).send({
      success: true,
      message: `${User.name} Login Successfully`,
      User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
