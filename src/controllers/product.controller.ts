import { Request, Response, NextFunction } from 'express';
import productService from '../services/product.service';
import catchAsync from '../utils/catchAsync';

class ProductController {
  // GET /products
  getProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.getProducts({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      sort: req.query.sort as string,
      category: req.query.category as string,
      search: req.query.search as string,
      isActive: req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  });

  // POST /products
  createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      status: 'success',
      data: product,
    });
  });

  // GET /products/:id
  getProduct = catchAsync(async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const product = await productService.getProductById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: product,
    });
  });
}

export default new ProductController();