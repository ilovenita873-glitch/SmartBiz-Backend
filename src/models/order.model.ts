import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  customerName: string;
  customerPhone?: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Miqdor kamida 1 bo‘lishi kerak'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Narx 0 dan kichik bo‘lishi mumkin emas'],
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    customerName: {
      type: String,
      required: [true, 'Mijoz ismi majburiy'],
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items: IOrderItem[]) => items.length > 0,
        message: 'Buyurtmada kamida 1 ta mahsulot bo‘lishi kerak',
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Jami summa 0 dan kichik bo‘lishi mumkin emas'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual — mahsulotlar soni
orderSchema.virtual('itemsCount').get(function (this: IOrder) {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;