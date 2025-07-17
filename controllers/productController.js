import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

export const listProducts = async (req, res) => {
  try {
    console.log('[Product Controller] Listing products');
    const products = await Product.find({}).populate('user', 'name email');
    console.log('[Product Controller] Products found:', products.length);
    console.log('[Product Controller] Products found:', products);
    return res.status(200).json({message: 'Products retrieved successfully', products });
    
  } catch (error) {
    console.error('[Product Controller] Error listing products:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const listProductsbyid = async (req, res) => {
  const id = req.params.id;
  console.log('[Product Controller] Listing product by ID:', id);
  try {
    const product = await Product.findById(id).populate('user', 'name email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('[Product Controller] Product found:', product);
    return res.status(200).json({ message: 'Product retrieved successfully', product });

  } catch (error) {
    console.error('[Product Controller] Error listing product by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });

    
  }
}


export const createProducts = async (req, res) => {
    const {name, description, brand, category, price, countInStock} = req.body;
    const  path = req.file.path;

    if (!name || !description || !brand || !category || !price || !countInStock) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
    }
    
    try {
      const product = await Product.create({
        name,
        description,
        brand,
        category,
        price,
        countInStock,
        image: {
          url: path,
          public_id: req.file.filename
        },
        user: req.user._id, 
    });

    console.log('[Product Controler] Product created:', product);
    
    return res.status(201).json({
      message: 'Product created successfully',
      product: {
        _id: product._id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        countInStock: product.countInStock,
        image: {
          url: product.image.url,
          public_id: product.image.public_id
        }
      }
    });

    } catch (error) {
        console.error('[Product Controller] Error creating product:', error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}


export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, brand, category, price, countInStock } = req.body;
  const path = req.file ? req.file.path : null;
  const img_id = req.file ? req.file.filename : null;

  console.log('[Product Controller] Updating product with ID:', id);
  console.log('[Product Controller] Update data:', {
    name, description, brand, category, price, countInStock, path
  });
  try {
    const update={};
    if (name) update.name = name;
    if (description) update.description = description;
    if (brand) update.brand = brand;
    if (category) update.category = category;
    if (price) update.price = price;
    if (countInStock) update.countInStock = countInStock;
    if (path) {
      update.image = {
        url: path,
        public_id: img_id
      };
    }

    const product = await Product.findByIdAndUpdate(id,{$set: update}, { new: true }).populate('user', 'name email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('[Product Controller] Product updated:', product);
    return res.status(200).json({message: 'Product updated successfully',product});
  } catch (error) {
    console.error('[Product Controller] Error updating product:', error);
    return res.status(500).json({ message: 'Internal server error' });
    
  }
}

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log('[Product Controller] Deleting product with ID:', id);
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const image = product.image;
    if (image && image.public_id) {
      const data = await cloudinary.uploader.destroy(image.public_id, image);
      console.log('[Product Controller] Image deleted from Cloudinary:', data);
      console.log('[Product Controller] Image to be deleted:', image.public_id);
    }else {
      console.log('[Product Controller] No image to delete for product:', id);
    }
    console.log('[Product Controller] Product deleted:', product);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('[Product Controller] Error deleting product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}