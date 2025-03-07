import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import {Authenticated  } from '../Middleware/Auth.js'

const router = express.Router();

//! Add Address
router.post('/add',Authenticated, addAddress)

//! get address
router.get('/get',Authenticated, getAddress)

export default router;
