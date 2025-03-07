import express from 'express';
import { login, profile, register, users } from '../Controllers/User.js';
import { Authenticated } from '../Middleware/Auth.js';

const router = express.Router()

//! Register User
router.post('/register', register)

//! Login User
router.post('/login', login)

//! Get all Users
router.get('/all', users)

//!! get user profile
router.get('/profile',Authenticated, profile)

export default router;