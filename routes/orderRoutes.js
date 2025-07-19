import express from 'express';
import { createOrder,getMyOrders,updateOrderToPaid,updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const OrderRouter = express.Router();

OrderRouter.post('/order', protect,admin, createOrder);

OrderRouter.get('/myorders', protect, getMyOrders);

OrderRouter.put('/:id/pay', protect, updateOrderToPaid);          

OrderRouter.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default OrderRouter;
