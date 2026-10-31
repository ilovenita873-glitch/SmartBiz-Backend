import { Router } from 'express';
import statisticsController from '../controllers/statistics.controller';

const router = Router();

router
  .route('/')
  .get(statisticsController.getStatistics);

export default router;