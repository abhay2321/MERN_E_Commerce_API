import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";  

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

   if (!token) return res.json({ message: "Login First" });

  const decoded = jwt.verify(token, "1234$1%()");
//   console.log(decoded);

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "User Not Found" });

  req.user = user;
  next();
};
