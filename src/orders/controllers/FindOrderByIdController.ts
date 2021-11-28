import { Request, Response } from 'express';
import { OrderModel } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { FindOrderByIdService } from '../services/FindOrderByIdService';

export class FindOrderByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ordersRepository = new OrdersRepository(OrderModel);
    const findOrderByIdService = new FindOrderByIdService(ordersRepository);

    const order = await findOrderByIdService.execute(id);

    return response.json(order);
  }
}
