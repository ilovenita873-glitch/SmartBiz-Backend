import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import productRoutes from './routes/product.routes';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();

// Basic middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'SmartBiz Backend is running' });
});

// Routes
app.use('/products', productRoutes);

// Global error handler
app.use(errorHandler);

export default app;