import { Request, Response } from 'express';
import { ProductModel } from '../../products/models/Products';
import { ProductsRepository } from '../../products/repositories/ProductsRepository';
import { OrderModel } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { CreateOrderService } from '../services/CreateOrderService';

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { products } = request.body;

    const ordersRepository = new OrdersRepository(OrderModel);
    const productsRepository = new ProductsRepository(ProductModel);
    const createOrderService = new CreateOrderService(
      ordersRepository,
      productsRepository,
    );

    const order = await createOrderService.execute(products);

    return response.json(order);
  }
}
