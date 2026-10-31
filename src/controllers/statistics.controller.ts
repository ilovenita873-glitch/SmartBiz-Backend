import { Request, Response, NextFunction } from 'express';
import statisticsService from '../services/statistics.service';
import catchAsync from '../utils/catchAsync';

class StatisticsController {
  // GET /statistics
  getStatistics = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stats = await statisticsService.getStatistics();

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  });
}

export default new StatisticsController();