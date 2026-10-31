import Order, { IOrder } from '../models/order.model';
import Product from '../models/product.model';
import AppError from '../utils/AppError';

interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

interface CreateOrderDto {
  customerName: string;
  customerPhone?: string;
  items: CreateOrderItemDto[];
}

class OrderService {
  async createOrder(data: CreateOrderDto): Promise<IOrder> {
    if (!data.items || data.items.length === 0) {
      throw new AppError('Buyurtmada kamida 1 ta mahsulot bo‘lishi kerak', 400);
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of data.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new AppError(`Mahsulot topilmadi: ${item.productId}`, 404);
      }

      if (product.quantity < item.quantity) {
        throw new AppError(`"${product.name}" mahsulotidan yetarli miqdor yo‘q`, 400);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Ombor qoldig‘ini kamaytirish
      product.quantity -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: orderItems,
      totalAmount,
    });

    // Populate qilib qaytaramiz
    await order.populate('items.product', 'name price');

    return order;
  }
}

export default new OrderService();