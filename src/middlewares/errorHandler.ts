import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = err instanceof AppError ? err.status : 'error';

  res.status(statusCode).json({
    status,
    message: err.message,
  });
};

export default errorHandler;
