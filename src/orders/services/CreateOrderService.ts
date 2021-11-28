import { CustomError } from '../../errors/CustomError';
import { IProduct } from '../../products/interfaces/IProduct';
import { ProductsRepository } from '../../products/repositories/ProductsRepository';
import { OrderDocument } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(products: IProduct[]): Promise<OrderDocument> {
    const itens = await Promise.all(
      products.map(async orderedProduct => {
        const product = await this.productsRepository.findByName(
          orderedProduct.name,
        );

        if (!product) {
          throw new CustomError('Product not found', 404);
        }

        if (product.quantity < orderedProduct.quantity) {
          throw new CustomError(
            `Product ${product.name} not available in stock`,
          );
        }

        Object.assign(orderedProduct, { price: product.price });
        return orderedProduct.quantity * product.price;
      }),
    );

    const total = itens.reduce((accumulator: number, next: number): number => {
      const result = (accumulator += next);
      const fixedTotal = Number(result.toFixed(2));
      return fixedTotal;
    }, 0);

    const order = await this.ordersRepository.create(products, total);

    // confirmed purchase, subtract from stock
    if (order && order.products[0]) {
      await Promise.all(
        order.products.map(async productConfirmed => {
          const product = await this.productsRepository.findByName(
            productConfirmed.name,
          );

          if (!product) {
            throw new CustomError('Product not found', 404);
          }

          await this.productsRepository.subtractQuantity(
            product,
            productConfirmed.quantity,
          );
        }),
      );
    }

    return order;
  }
}
