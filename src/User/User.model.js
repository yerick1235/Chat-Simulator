import mongoose, { model, Schema } from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, "The Username must be 5 to 20 characters"],
    maxLength: [20, "The Username must be 5 to 20 characters"],
    unique: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: [6, "The Password must be 6 characters or more"],
    required: true,
  },
  contacts: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
});

export default model("user", userSchema);
