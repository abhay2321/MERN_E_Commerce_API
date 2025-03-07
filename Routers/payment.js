import express from "express";
import { checkout, verify, userOrder, allOrders } from "../Controllers/payment.js";
import { Authenticated } from "../Middleware/Auth.js";

const router = express.Router();

//! checkout
router.post("/checkout", checkout);

//! verify-payment & save to db
router.post("/verify-payment", verify);

//! userOrder
router.get("/userorder",Authenticated, userOrder);

//! All Orders
router.get("/orders",allOrders);

export default router;
