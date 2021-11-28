import { Router } from 'express';
import { CreateOrderController } from '../controllers/CreateOrderController';
import { FindAllOrdersController } from '../controllers/FindAllOrdersController';
import { FindOrderByIdController } from '../controllers/FindOrderByIdController';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();
const findAllOrdersController = new FindAllOrdersController();
const findOrderByIdController = new FindOrderByIdController();

ordersRouter.post('/', createOrderController.handle);
ordersRouter.get('/', findAllOrdersController.handle);
ordersRouter.get('/:id', findOrderByIdController.handle);

export { ordersRouter };
