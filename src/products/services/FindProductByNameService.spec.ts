// eslint-disable-next-line import/no-extraneous-dependencies
import * as mockingoose from 'mockingoose';
import { ProductModel } from '../models/Products';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { FindProductByNameService } from './FindProductByNameService';

describe('FindProductByName', () => {
  it('should be return a product by name', async () => {
    const fakeProduct = {
      name: 'Lentils',
      price: 7.67,
      quantity: 1,
    };
    mockingoose(ProductModel).toReturn(fakeProduct, 'findOne');

    const productsRepository = new ProductsRepository(ProductModel);
    const findProductByNameService = new FindProductByNameService(
      productsRepository,
    );
    const correctName = 'Lentils';

    const product = await findProductByNameService.execute(correctName);
    expect(product).toMatchObject(fakeProduct);
  });

  it('should throw an error if the product does not exist', async () => {
    mockingoose(ProductModel).toReturn(undefined, 'findOne');

    const productsRepository = new ProductsRepository(ProductModel);
    const findProductByNameService = new FindProductByNameService(
      productsRepository,
    );
    const incorrectName = 'Beans';

    await findProductByNameService.execute(incorrectName).catch(err => {
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Product not found');
    });
  });
});
