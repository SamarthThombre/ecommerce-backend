import express from 'express'
import  { Router } from 'express'
import {  signin, signup, getMe } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js';



const userRouter = Router();

userRouter.get('/test', (req, res) => {
    res.send('User user api is working');
})

// Define a simple route for user-related operations
userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

userRouter.get('/me', protect, getMe);


export default userRouter;