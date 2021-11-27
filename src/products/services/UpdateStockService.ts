import { Message } from 'amqplib';
import { CustomError } from '../../errors/CustomError';
import { ActionStockEnum } from '../enums/ActionStockEnum';
import { IProduct } from '../interfaces/IProduct';
import { ProductsRepository } from '../repositories/ProductsRepository';

export class UpdateStockService {
  constructor(private productRepository: ProductsRepository) {}

  async execute(
    message: Message | null,
    action: ActionStockEnum,
  ): Promise<IProduct> {
    if (!message) {
      throw new CustomError('Unidentified message');
    }

    const name = message.content.toString('utf-8').replace(/^"|"$/g, '');
    const product = await this.productRepository.findByName(name);

    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    if (action === ActionStockEnum.DECREMENTED && product.quantity === 0) {
      // eslint-disable-next-line no-underscore-dangle
      throw new CustomError(
        `It was not possible to decrement the product ${product.name} because its stock is 0`,
      );
    }

    const makeMethodRepository = (action: ActionStockEnum) => {
      if (action === ActionStockEnum.INCREMENTED) return 'incrementQuantity';
      if (action === ActionStockEnum.DECREMENTED) return 'decrementQuantity';
      throw new CustomError('Unidentified action');
    };

    const updatedProduct = await this.productRepository[
      makeMethodRepository(action)
    ](product);

    if (!updatedProduct) {
      throw new CustomError('Unable to update product quantity');
    }

    return updatedProduct;
  }
}
