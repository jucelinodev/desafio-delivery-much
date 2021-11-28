import { Request, Response } from 'express';
import { OrderModel } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { FindAllOrderService } from '../services/FindAllOrdersService';

export class FindAllOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const ordersRepository = new OrdersRepository(OrderModel);
    const findAllOrdersService = new FindAllOrderService(ordersRepository);

    const orders = await findAllOrdersService.execute();

    return response.json({ orders });
  }
}
