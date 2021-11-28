import { CustomError } from '../../errors/CustomError';
import { OrderDocument } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class FindOrderByIdService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(id: string): Promise<OrderDocument> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new CustomError('Order not found', 404);
    }

    return order;
  }
}
