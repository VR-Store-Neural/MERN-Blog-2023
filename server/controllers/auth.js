import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(402).json({
        message: "Цей username вже зайнятий",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    await newUser.save();

    res.json({
      newUser,
      message: "Регістрація успішна",
    });
  } catch (error) {
    res.json({ message: "Помилка при створенні користувача" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Такого юзера не існує.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Невірний пароль.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Ви увійшли у систему.",
    });
  } catch (error) {
    res.json({ message: "Помилка під час авторизації." });
    console.error;
  }
};

// Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne(req.userId);

    if (!user) {
      return res.json({
        message: "Такого юзера не існує.",
      });
    }

    const tokent = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expires: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: "Доступ заборонено." });
  }
};
