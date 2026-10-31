import Order from '../models/order.model';
import Product from '../models/product.model';

class StatisticsService {
  async getStatistics() {
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      salesStats,
      topProducts,
    ] = await Promise.all([
      // Jami mahsulotlar
      Product.countDocuments(),

      // Faol mahsulotlar
      Product.countDocuments({ isActive: true }),

      // Jami buyurtmalar
      Order.countDocuments(),

      // Savdo statistikasi (Aggregation)
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' },
            averageOrderValue: { $avg: '$totalAmount' },
            totalOrders: { $sum: 1 },
          },
        },
      ]),

      // Eng ko‘p sotilgan mahsulotlar
      Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            totalSold: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        {
          $project: {
            _id: 0,
            productId: '$_id',
            name: '$product.name',
            totalSold: 1,
            totalRevenue: 1,
          },
        },
      ]),
    ]);

    const sales = salesStats[0] || {
      totalRevenue: 0,
      averageOrderValue: 0,
      totalOrders: 0,
    };

    return {
      products: {
        total: totalProducts,
        active: activeProducts,
      },
      orders: {
        total: totalOrders,
      },
      sales: {
        totalRevenue: sales.totalRevenue,
        averageOrderValue: Math.round(sales.averageOrderValue || 0),
      },
      topProducts,
    };
  }
}

export default new StatisticsService();