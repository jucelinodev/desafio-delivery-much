import { ProductsDocument } from '../../products/models/Products';

export interface IOrder {
  products: ProductsDocument[];
  total: number;
}
