import Product, { IProduct } from '../models/product.model';
import AppError from '../utils/AppError';

interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  isActive?: boolean;
}

interface GetProductsQuery {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  search?: string;
  isActive?: boolean;
}

class ProductService {
  // Barcha mahsulotlarni olish (pagination, sorting, filtering, search)
  async getProducts(query: GetProductsQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Filter
    const filter: any = {};

    if (query.category) {
      filter.category = query.category;
    }

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    // Sort
    const sortBy = query.sort || '-createdAt';

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortBy).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Yangi mahsulot qo‘shish
  async createProduct(data: CreateProductDto): Promise<IProduct> {
    const product = await Product.create(data);
    return product;
  }

  // Bitta mahsulotni olish
  async getProductById(id: string): Promise<IProduct> {
    const product = await Product.findById(id);

    if (!product) {
      throw new AppError('Mahsulot topilmadi', 404);
    }

    return product;
  }
}

export default new ProductService();