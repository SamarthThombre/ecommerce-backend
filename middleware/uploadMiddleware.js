import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

console.log('[uploadMddleware]Cloudinary Storage Initialized');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ecommerce-products',      // Folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

const upload = multer({ storage });

export default upload;