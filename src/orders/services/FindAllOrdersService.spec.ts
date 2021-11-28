// eslint-disable-next-line import/no-extraneous-dependencies
import * as mockingoose from 'mockingoose';
import { Types } from 'mongoose';
import { OrderModel } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { FindAllOrderService } from './FindAllOrdersService';

describe('FindAllOrdersService', () => {
  it('should list all orders', async () => {
    const fakeOrderList = [
      {
        _id: new Types.ObjectId('61a2c57a5191dbcb379d1eba'),
        products: [
          {
            name: 'Allium',
            quantity: 3,
            price: 5.92,
          },
        ],
        total: 17.76,
      },
      {
        _id: new Types.ObjectId('61a2c698bbe6ff20096dcb90'),
        products: [
          {
            name: 'Lentils',
            quantity: 1,
            price: 7.67,
          },
        ],
        total: 7.67,
      },
    ];
    mockingoose(OrderModel).toReturn(fakeOrderList, 'find');
    const ordersRepository = new OrdersRepository(OrderModel);
    const findAllOrdersService = new FindAllOrderService(ordersRepository);

    const orders = await findAllOrdersService.execute();
    expect(orders).toMatchObject(fakeOrderList);
  });

  it('should return an empty list if there is nothing in the database', async () => {
    mockingoose(OrderModel).toReturn([], 'find');
    const ordersRepository = new OrdersRepository(OrderModel);
    const findAllOrdersService = new FindAllOrderService(ordersRepository);

    const orders = await findAllOrdersService.execute();
    expect(orders).toMatchObject([]);
  });
});
