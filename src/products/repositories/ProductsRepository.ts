import { IProduct } from '../interfaces/IProduct';
import { ProductModel, ProductsDocument } from '../models/Products';

export class ProductsRepository {
  constructor(private readonly productModel: typeof ProductModel) {}

  async findByName(name: string): Promise<ProductsDocument | null> {
    return this.productModel.findOne({ name });
  }

  async incrementQuantity(
    product: ProductsDocument,
  ): Promise<ProductsDocument> {
    product.quantity++;
    return product.save();
  }

  async decrementQuantity(
    product: ProductsDocument,
  ): Promise<ProductsDocument | null> {
    product.quantity--;
    return product.save();
  }

  async subtractQuantity(
    product: ProductsDocument,
    quantity: number,
  ): Promise<ProductsDocument | null> {
    product.quantity -= quantity;
    return product.save();
  }

  async createMany(products: IProduct[]): Promise<ProductsDocument[]> {
    return this.productModel.insertMany(products);
  }
}
