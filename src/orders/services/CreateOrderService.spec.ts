// eslint-disable-next-line import/no-extraneous-dependencies
import * as mockingoose from 'mockingoose';
import { Types } from 'mongoose';
import { ProductModel } from '../../products/models/Products';
import { ProductsRepository } from '../../products/repositories/ProductsRepository';
import { OrderModel } from '../models/Orders';
import { OrdersRepository } from '../repositories/OrdersRepository';
import { CreateOrderService } from './CreateOrderService';

describe('CreateOrderService', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should return an order, with products, quantity and total price', async () => {
    const fakeOrderResult = {
      _id: new Types.ObjectId('61a2c57a5191dbcb379d1eb3'),
      products: [
        {
          name: 'Allium',
          quantity: 3,
          price: 5.92,
        },
        {
          name: 'Lentils',
          quantity: 1,
          price: 7.67,
        },
      ],
      total: 25.72,
    };

    const fakeProducts = [
      {
        name: 'Allium',
        quantity: 3,
        price: 5.92,
      },
      {
        name: 'Lentils',
        quantity: 1,
        price: 7.67,
      },
    ];

    const requestProducts = [
      {
        name: 'Allium',
        quantity: 3,
      },
      {
        name: 'Lentils',
        quantity: 1,
      },
    ];

    mockingoose(ProductModel).toReturn(fakeProducts[0], 'findOne');
    mockingoose(OrderModel).toReturn(fakeOrderResult, 'save');

    const productsRepository = new ProductsRepository(ProductModel);
    const ordersRepository = new OrdersRepository(OrderModel);
    const createOrderService = new CreateOrderService(
      ordersRepository,
      productsRepository,
    );

    const order = await createOrderService.execute(requestProducts);
    expect(order._id).toBe(fakeOrderResult._id);
    expect(order.products).toBe(fakeOrderResult.products);
    expect(order.total).toBe(fakeOrderResult.total);
  });

  it('should return error if you cannot find the product', async () => {
    const fakeOrderResult = {
      _id: new Types.ObjectId('61a2c57a5191dbcb379d1eb3'),
      products: [
        {
          name: 'Allium',
          quantity: 3,
          price: 5.92,
        },
        {
          name: 'Lentils',
          quantity: 1,
          price: 7.67,
        },
      ],
      total: 25.72,
    };

    const requestProducts = [
      {
        name: 'Allium',
        quantity: 3,
      },
      {
        name: 'Lentils',
        quantity: 1,
      },
    ];

    mockingoose(OrderModel).toReturn(fakeOrderResult, 'save');

    const productsRepository = new ProductsRepository(ProductModel);
    const ordersRepository = new OrdersRepository(OrderModel);
    const createOrderService = new CreateOrderService(
      ordersRepository,
      productsRepository,
    );

    await createOrderService.execute(requestProducts).catch(err => {
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Product not found');
    });
  });

  it('should return error if there is no product available', async () => {
    const fakeOrderResult = {
      _id: new Types.ObjectId('61a2c57a5191dbcb379d1eb3'),
      products: [
        {
          name: 'Allium',
          quantity: 3,
          price: 5.92,
        },
        {
          name: 'Lentils',
          quantity: 1,
          price: 7.67,
        },
      ],
      total: 25.72,
    };

    const fakeProducts = [
      {
        name: 'Allium',
        quantity: 0,
        price: 5.92,
      },
      {
        name: 'Lentils',
        quantity: 0,
        price: 7.67,
      },
    ];

    const requestProducts = [
      {
        name: 'Allium',
        quantity: 3,
      },
      {
        name: 'Lentils',
        quantity: 1,
      },
    ];

    mockingoose(ProductModel).toReturn(fakeProducts[0], 'findOne');
    mockingoose(OrderModel).toReturn(fakeOrderResult, 'save');

    const productsRepository = new ProductsRepository(ProductModel);
    const ordersRepository = new OrdersRepository(OrderModel);
    const createOrderService = new CreateOrderService(
      ordersRepository,
      productsRepository,
    );

    await createOrderService.execute(requestProducts).catch(err => {
      expect(err.statusCode).toBe(422);
    });
  });
});
