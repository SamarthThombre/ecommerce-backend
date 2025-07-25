import express from "express";
import { Router } from "express";
import { listProducts, createProducts,listProductsbyid, updateProduct , deleteProduct } from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect, admin } from '../middleware/authMiddleware.js';

const productRoutes = Router();

productRoutes.get("/test", (req, res) => {
  res.send("Products apt working fine");
})

productRoutes.get("/list", listProducts);

productRoutes.get("/list/:id", listProductsbyid);

productRoutes.post("/update/:id",protect,admin, upload.single('image'),updateProduct );

productRoutes.post("/create",protect,admin, upload.single('image'),createProducts );

productRoutes.delete('/delete/:id', protect,admin, deleteProduct )


export default productRoutes;