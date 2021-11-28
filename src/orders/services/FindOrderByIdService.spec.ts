// eslint-disable-next-line import/no-extraneous-dependencies
import * as mockingoose from 'mockingoose';
import { OrderModel } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { FindOrderByIdService } from './FindOrderByIdService';

describe('FindOrderById', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should be return a order by id', async () => {
    const fakeOrder = {
      _id: '61a2c0dac48e6ec075f85413',
      products: [
        {
          name: 'Allium',
          quantity: 1,
          price: 5.92,
        },
      ],
      total: 5.92,
    };
    mockingoose(OrderModel).toReturn(fakeOrder, 'findOne');
    const ordersRepository = new OrdersRepository(OrderModel);
    const findOrderByIdService = new FindOrderByIdService(ordersRepository);
    const correctId = '61a2c0dac48e6ec075f85413';

    const order = await findOrderByIdService.execute(correctId);
    expect(String(order._id)).toBe(correctId);
    expect(order.products).toBe(fakeOrder.products);
    expect(order.total).toBe(fakeOrder.total);
  });

  it('should throw an error if the order does not exist', async () => {
    mockingoose(OrderModel).toReturn(undefined, 'findOne');
    const ordersRepository = new OrdersRepository(OrderModel);
    const findOrderByIdService = new FindOrderByIdService(ordersRepository);
    const inCorrectId = '61a2c0dac48e6ec075f8541';

    await findOrderByIdService.execute(inCorrectId).catch(err => {
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Order not found');
    });
  });
});
