import csv from 'csvtojson';
import 'dotenv/config';

import { connection } from 'mongoose';
import { mongooseConnection } from './connection';
import { ProductModel } from '../products/models/Products';
import { ProductsRepository } from '../products/repositories/ProductsRepository';

mongooseConnection.then(() => {
  const productsRepository = new ProductsRepository(ProductModel);

  interface IProductCsv {
    name: string;
    price: string;
    quantity: string;
  }

  const productsSeeder = async () => {
    const csvFilePath = './products.csv';
    const products = await csv().fromFile(csvFilePath);

    const productsFormated = products.map((product: IProductCsv) => ({
      name: product.name,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
    }));
    await productsRepository.createMany(productsFormated);
    connection.close();
    return console.log('--- Seeder successfully executed ---');
  };
  productsSeeder();
});
