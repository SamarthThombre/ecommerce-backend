import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },

    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },

    // Image from Cloudinary
    image: {
      url: { type: String, required: true },
      public_id: { type: String }, 
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
