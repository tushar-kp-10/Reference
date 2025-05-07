import reviewModel from "../models/reviewModel.js";

const addReview = async (req, res) => {
  try {
    const { userId, productId, reviewText } = req.body;

    const reviewData = {
      userId: userId,
      productId: productId,
      reviewText: reviewText,
      date: Date.now(),
    };

    console.log("called by frontend");

    const newReview = new reviewModel(reviewData);
    await newReview.save();

    res.json({ success: true, message: "Review Posted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const { productId } = req.body;

    const reviews = await reviewModel
      .find({ productId })
      .populate("userId", "name");
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {

  try {
    const { reviewId } = req.body
    await reviewModel.findByIdAndDelete({_id : reviewId})
    res.json({success : true , message : "Review Deleted"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

export { addReview, getReview,deleteReview };
