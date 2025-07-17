

export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = req.file.path;       // Cloudinary URL
    const publicId = req.file.filename;   // Cloudinary public ID

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: {
        url: imageUrl,
        public_id: publicId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message,
    });
  }
};
