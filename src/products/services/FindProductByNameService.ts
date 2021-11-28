import { CustomError } from '../../errors/CustomError';
import { IProduct } from '../interfaces/IProduct';
import { ProductsRepository } from '../repositories/ProductsRepository';

export class FindProductByNameService {
  constructor(private productRepository: ProductsRepository) {}

  async execute(name: string): Promise<IProduct> {
    const product = await this.productRepository.findByName(name);

    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    return {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  }
}
