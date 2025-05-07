import mongoose from "mongoose";

const userSchemaa = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    contact: { type: String },
    address: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchemaa);

export default userModel;
