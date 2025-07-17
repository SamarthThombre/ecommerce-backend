import express from 'express';
import { Router } from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const uploadRouter = Router();

uploadRouter.get('/test', (req, res) => {
    res.send('User user api is working');
})


uploadRouter.post('/image',upload.single('image'), uploadImage);

export default uploadRouter;
