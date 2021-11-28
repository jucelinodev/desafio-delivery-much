/* eslint-disable import/no-extraneous-dependencies */
import * as mockingoose from 'mockingoose';
import { Message } from 'amqplib';
import { ActionStockEnum } from '../enums/ActionStockEnum';
import { ProductModel } from '../models/Products';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { UpdateStockService } from './UpdateStockService';

describe('UpdateStockService', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should increase the quantity of the product in stock', async () => {
    const fakeProduct = {
      name: 'Lentils',
      price: 7.67,
      quantity: 1,
    };

    mockingoose(ProductModel).toReturn(fakeProduct, 'findOne');
    mockingoose(ProductModel).toReturn(
      { name: 'Lentils', price: 7.67, quantity: 2 },
      'save',
    );

    const productsRepository = new ProductsRepository(ProductModel);
    const updateStockService = new UpdateStockService(productsRepository);
    const correctName = 'Lentils' as unknown as Message | null;
    const updateProduct = await updateStockService.execute(
      correctName,
      ActionStockEnum.INCREMENTED,
    );

    expect(updateProduct.quantity).toBe(2);
  });

  it('should decrase the quantity of the product in stock', async () => {
    const fakeProduct = {
      name: 'Lentils',
      price: 7.67,
      quantity: 1,
    };

    mockingoose(ProductModel).toReturn(fakeProduct, 'findOne');
    mockingoose(ProductModel).toReturn(
      { name: 'Lentils', price: 7.67, quantity: 0 },
      'save',
    );

    const productsRepository = new ProductsRepository(ProductModel);
    const updateStockService = new UpdateStockService(productsRepository);
    const correctMessage = 'Lentils' as unknown as Message | null;

    const updateProduct = await updateStockService.execute(
      correctMessage,
      ActionStockEnum.DECREMENTED,
    );

    expect(updateProduct.quantity).toBe(0);
  });

  it('should return an error if no message arrives', async () => {
    const fakeProduct = {
      name: 'Lentils',
      price: 7.67,
      quantity: 1,
    };

    mockingoose(ProductModel).toReturn(fakeProduct, 'findOne');
    mockingoose(ProductModel).toReturn(
      { name: 'Lentils', price: 7.67, quantity: 2 },
      'save',
    );

    const productsRepository = new ProductsRepository(ProductModel);
    const updateStockService = new UpdateStockService(productsRepository);
    const incorrectMessage = undefined as unknown as Message | null;

    await updateStockService
      .execute(incorrectMessage, ActionStockEnum.INCREMENTED)
      .catch(err => {
        expect(err.statusCode).toBe(422);
        expect(err.message).toBe('Unidentified message');
      });
  });

  it('should return an error if there is no product with the message name', async () => {
    mockingoose(ProductModel).toReturn(undefined, 'findOne');
    mockingoose(ProductModel).toReturn(
      { name: 'Lentils', price: 7.67, quantity: 2 },
      'save',
    );

    const productsRepository = new ProductsRepository(ProductModel);
    const updateStockService = new UpdateStockService(productsRepository);
    const correctName = 'Lentils' as unknown as Message | null;

    await updateStockService
      .execute(correctName, ActionStockEnum.INCREMENTED)
      .catch(err => {
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe('Product not found');
      });
  });

  it('should return an error if you try to decrement a product with 0 stock', async () => {
    const fakeProduct = {
      name: 'Lentils',
      price: 7.67,
      quantity: 0,
    };

    mockingoose(ProductModel).toReturn(fakeProduct, 'findOne');
    mockingoose(ProductModel).toReturn(
      { name: 'Lentils', price: 7.67, quantity: -1 },
      'save',
    );

    const productsRepository = new ProductsRepository(ProductModel);
    const updateStockService = new UpdateStockService(productsRepository);
    const correctName = 'Lentils' as unknown as Message | null;

    await updateStockService
      .execute(correctName, ActionStockEnum.DECREMENTED)
      .catch(err => {
        expect(err.statusCode).toBe(422);
        expect(err.message).toBe(
          `It was not possible to decrement the product ${fakeProduct.name} because its stock is 0`,
        );
      });
  });

  it('should return an error if you try the action is not identified', async () => {
    const fakeProduct = {
      name: 'Lentils',
      price: 7.67,
      quantity: 1,
    };

    mockingoose(ProductModel).toReturn(fakeProduct, 'findOne');
    mockingoose(ProductModel).toReturn(
      { name: 'Lentils', price: 7.67, quantity: 2 },
      'save',
    );

    const productsRepository = new ProductsRepository(ProductModel);
    const updateStockService = new UpdateStockService(productsRepository);
    const correctName = 'Lentils' as unknown as Message | null;

    await updateStockService
      .execute(correctName, 'incorretAction' as ActionStockEnum)
      .catch(err => {
        expect(err.statusCode).toBe(422);
        expect(err.message).toBe('Unidentified action');
      });
  });
});
