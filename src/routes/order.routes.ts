import { Router } from 'express';
import orderController from '../controllers/order.controller';

const router = Router();

router
  .route('/')
  .post(orderController.createOrder);

export default router;