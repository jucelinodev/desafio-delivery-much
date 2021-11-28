import { IProduct } from '../../products/interfaces/IProduct';
import { OrderDocument, OrderModel } from '../models/Orders';

export class OrdersRepository {
  constructor(private readonly orderModel: typeof OrderModel) {}

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find();
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ _id: id });
  }

  async create(products: IProduct[], total: number): Promise<OrderDocument> {
    return this.orderModel.create({ products, total });
  }
}
