import { OrderDocument, OrderModel } from '../models/Orders';
import { ProductsRequest } from '../services/CreateOrderService';

export class OrdersRepository {
  constructor(private readonly orderModel: typeof OrderModel) {}

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find();
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ _id: id });
  }

  async create(
    products: ProductsRequest[],
    total: number,
  ): Promise<OrderDocument> {
    const order = new OrderModel({ products, total });
    return order.save();
  }
}
