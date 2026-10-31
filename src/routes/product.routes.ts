import { Router } from 'express';
import productController from '../controllers/product.controller';

const router = Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct);

export default router;