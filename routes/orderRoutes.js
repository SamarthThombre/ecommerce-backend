import express from 'express';
import { createOrder,getMyOrders,updateOrderToPaid,updateOrderToDelivered } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const OrderRouter = express.Router();

router.post('/', protect, createOrder);

router.get('/myorders', protect, getMyOrders);

router.put('/:id/pay', protect, updateOrderToPaid);          

router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default OrderRouter;
