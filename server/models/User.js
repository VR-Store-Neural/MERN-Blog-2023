import mongoose from "mongoose";

// Створюємо модель
const userSchema = new mongoose.Schema(
  // Створюємо унікальний об'єкт
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamp: true } // За допомогою цього рядка буде видно час створення поста
);

export default mongoose.model("user", userSchema);
