import { Router } from 'express';
import { ordersRouter } from './orders/routes/orderRoutes';
import { productsRouter } from './products/routes/productRoutes';

const router = Router();

router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export { router };
