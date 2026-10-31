import { Request, Response, NextFunction } from 'express';
import orderService from '../services/order.service';
import catchAsync from '../utils/catchAsync';

class OrderController {
  // POST /orders
  createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      status: 'success',
      data: order,
    });
  });
}

export default new OrderController();