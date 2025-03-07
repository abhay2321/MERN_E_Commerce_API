import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProudctQty,
  removeProductFromCart,
  userCart,
} from "../Controllers/cart.js";

import { Authenticated } from "../Middleware/Auth.js";

const router = express.Router();

//! Add to Cart
router.post("/add",Authenticated, addToCart);

//! get User Cart
router.get("/user",Authenticated, userCart);

//! remove Product from Cart
router.delete("/remove/:productId", Authenticated,removeProductFromCart);

//! Clear Cart
router.delete("/clear",Authenticated, clearCart);

//! Decrease item qty
router.post("/--qty",Authenticated, decreaseProudctQty)

export default router;
