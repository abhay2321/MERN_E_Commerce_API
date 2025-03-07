import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//! User Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.json({ message: "User Already exist", user, success: false });

    const hashPass = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPass });
    res
      .status(201)
      .json({ message: "User registered successfully", user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//! User Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res.json({ message: "Invalid credentials", success: false });

    const token = jwt.sign({ userId: user._id }, "1234$1%()", {
      expiresIn: "365d",
    });

    res.json({ message: `Welcone ${user.name}`, token, success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
};

//! get all Users
export const users = async (req, res) => {
  try {
    let user = await User.find().sort({ createdAt: -1 });
    res.json({ message: "All Users", user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//!! Get Profile
export const profile = async (req, res) => {
  res.json({ user: req.user });
};
