import express from "express";
import authUser from "../middlewares/auth.js";
import { addReview, deleteReview, getReview } from "../controllers/reviewController.js";
const reviewRouter = express.Router();


// add review
reviewRouter.post('/add',authUser,addReview)
reviewRouter.post('/get',getReview)
reviewRouter.post('/delete',deleteReview)

export default reviewRouter