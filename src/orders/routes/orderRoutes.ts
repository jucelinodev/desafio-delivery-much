import { Router } from 'express';
import { CreateOrderController } from '../controllers/CreateOrderController';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();

ordersRouter.post('/', createOrderController.handle);

export { ordersRouter };
