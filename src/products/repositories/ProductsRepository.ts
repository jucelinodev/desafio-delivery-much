import { IProduct } from '../interfaces/IProduct';
import { ProductModel, ProductsDocument } from '../models/Products';

export class ProductsRepository {
  constructor(private readonly productModel: typeof ProductModel) {}

  async createMany(products: IProduct[]): Promise<ProductsDocument[]> {
    return this.productModel.insertMany(products);
  }
}
