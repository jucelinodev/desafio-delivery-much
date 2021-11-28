import { Router } from 'express';
import { FindProductByNameController } from '../controllers/FindProductByNameController';

const productsRouter = Router();

const findProductByNameController = new FindProductByNameController();

productsRouter.get('/:name', findProductByNameController.handle);

export { productsRouter };
