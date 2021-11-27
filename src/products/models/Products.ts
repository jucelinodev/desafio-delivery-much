import { model, Schema, Document } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

export interface ProductsDocument extends IProduct, Document {}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ProductModel = model<ProductsDocument>('products', ProductSchema);
