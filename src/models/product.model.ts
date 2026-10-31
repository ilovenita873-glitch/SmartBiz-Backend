import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Mahsulot nomi majburiy'],
      trim: true,
      maxlength: [100, 'Nom 100 ta belgidan oshmasligi kerak'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Tavsif 500 ta belgidan oshmasligi kerak'],
    },
    price: {
      type: Number,
      required: [true, 'Narx majburiy'],
      min: [0, 'Narx 0 dan kichik bo‘lishi mumkin emas'],
    },
    quantity: {
      type: Number,
      required: [true, 'Miqdor majburiy'],
      min: [0, 'Miqdor 0 dan kichik bo‘lishi mumkin emas'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Kategoriya majburiy'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual misol (keyinroq ishlatamiz)
productSchema.virtual('inStock').get(function (this: IProduct) {
  return this.quantity > 0;
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;