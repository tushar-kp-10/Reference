import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "user",  required: true},
    productId : {type : mongoose.Schema.Types.ObjectId, ref : "product",  required: true},
    reviewText:{ type: String, required: true},
    date : {type : Number , required : true}
})

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);

export default reviewModel