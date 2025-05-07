import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// jwt toekn

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({ success: false, message: "No user found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      res.json({ success: false, message: "Invalid Password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email is not valid" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// model user
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Creadentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const userInfo = await userModel.findById({ _id: userId });
    if (!userInfo) {
      res.json({ success: false, message: "No User Found" });
    } else {
      res.json({ success: true, userInfo });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId, newName, newAddress, newContact, newEmail } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        name: newName,
        email: newEmail,
        contact: newContact,
        address: newAddress,
      },
      { new: true }
    );
    res.json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { userId, currPass, newPass } = req.body;

    const user = await userModel.findById({ _id: userId });

    const isMatched = await bcrypt.compare(currPass, user.password);

    if (!isMatched) {
      res.json({ success: false, message: "Invalid Password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    res.json({ success: true, updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  getUserDetails,
  updateUserDetails,
  resetUserPassword
};
