import { model, Schema, Document } from 'mongoose';
import { IOrder } from '../interfaces/IOrder';

export interface OrderDocument extends IOrder, Document {}

const OrderSchema = new Schema(
  {
    products: {
      type: Schema.Types.Mixed,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const OrderModel = model<OrderDocument>('Orders', OrderSchema);
