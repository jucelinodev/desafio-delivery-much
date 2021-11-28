import { OrderDocument } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';

export class FindAllOrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<OrderDocument[]> {
    return this.ordersRepository.findAll();
  }
}
