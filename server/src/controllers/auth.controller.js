import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    // check for any empty fields
    if (!name || !email || !password) {
      return res
        .status(409)
        .json({ message: "Empty fields are not allowed", success: false });
    }

    // check if email format is valid
    if (!emailRegex.test(email)) {
      return res
        .status(409)
        .json({ message: "invalid email fomat", success: false });
    }

    // check is password is atleast 6 characters long
    if (password.length < 6) {
      return res.status(409).json({
        message: "password must be atleast 6 character long",
        success: false,
      });
    }

    // hash the password of user
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // check if the email is already taken or not
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return res
        .status(409)
        .json({ message: "Email is already taken", success: false });
    }

    // if above all checks passed create a new user
    const newUser = await User.create({ name, email, password: hashPassword });

    if (!newUser) {
      return res
        .status(500)
        .json({ message: "Failed to create new account", success: false });
    } else {
      // give the user a cookie
      const token = jwt.sign(
        { ID: newUser._id, name: newUser.name },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      });
      return res
        .status(200)
        .json({ message: "Account Created Successfully", success: true });
    }

    //
  } catch (error) {
    console.log(`Error in register user controller ${error.message || error}`);
    return res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check for any empty fields
    if (!email || !password) {
      return res
        .status(409)
        .json({ message: "Empty fields are not allowed", success: false });
    }

    // check if email format is valid
    if (!emailRegex.test(email)) {
      return res
        .status(409)
        .json({ message: "invalid email fomat", success: false });
    }

    // check is password is atleast 6 characters long
    if (password.length < 6) {
      return res.status(409).json({
        message: "password must be atleast 6 character long",
        success: false,
      });
    }

    // check if the user exist with such email
    const doesUserExist = await User.findOne({ email });

    if (!doesUserExist) {
      return res.status(409).json({ message: "incorrect email or password" });
    }

    // compare the passwords
    const isPassCorrect = await bcrypt.compare(
      password,
      doesUserExist.password
    );
    if (!isPassCorrect) {
      return res.status(409).json({ message: "incorrect email or password" });
    }

    // if above all checks are passed login user and send a cookie
    const token = jwt.sign({ ID: doesUserExist._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
      domain:
        process.env.STATUS === "DEV"
          ? "http://localhost:3000"
          : process.env.CLIENT_URL,
    });

    // send the final response
    res.status(200).json({
      message: "User Logged In Successfully",
      userData: { name: doesUserExist.name, ID: doesUserExist._id },
      token,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in login user controller ${error.message || error}`);
  }
};

const authUSer = async (req, res) => {
  try {
    const { ID } = req.user;

    // find the user
    const findUser = await User.findById(ID);
    if (!findUser) {
      return res
        .status(404)
        .json({ message: "invalid token provided", success: false });
    } else {
      res.status(200).json({
        message: "user authenticated",
        success: true,
        data: { ID, name: findUser.name },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in delete user controller ${error.message || error}`);
  }
};

const logoutUser = async (req, res) => {
  try {
    res
      .cookie("jwt", "", { maxAge: 0 })
      .status(200)
      .json({ message: "user logged out", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in logout user controller ${error.message || error}`);
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in delete user controller ${error.message || error}`);
  }
};

export { loginUser, logoutUser, registerUser, deleteUser, authUSer };
