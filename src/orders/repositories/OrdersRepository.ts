import { IProduct } from '../../products/interfaces/IProduct';
import { OrderDocument, OrderModel } from '../models/Orders';

export class OrdersRepository {
  constructor(private readonly orderModel: typeof OrderModel) {}

  async create(products: IProduct[], total: number): Promise<OrderDocument> {
    return this.orderModel.create({ products, total });
  }
}
