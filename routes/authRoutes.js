import express from 'express'
const router = express.Router()

import ratelimiter from 'express-rate-limit'

const apiLimiter = ratelimiter({
    windowMs : 15 * 60 * 1000,
    max : 10,
    message : 
    'Too many requests from this IP address, please try again after 15 minutes',
})



import { register,login,updateUser } from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(apiLimiter,register)
router.route('/login').post(apiLimiter,login)
router.route('/updateUser').patch(authenticateUser,updateUser)

export default router