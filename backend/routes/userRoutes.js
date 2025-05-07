import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserDetails,
  updateUserDetails,
  resetUserPassword,
} from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/details", getUserDetails);
userRouter.post("/update", authUser, updateUserDetails);
userRouter.post("/reset", authUser, resetUserPassword);

export default userRouter;
