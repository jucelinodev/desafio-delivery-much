import { Request, Response } from 'express';
import { ProductModel } from '../models/Products';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { FindProductByNameService } from '../services/FindProductByNameService';

export class FindProductByNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;
    const productRepository = new ProductsRepository(ProductModel);
    const findProductByNameService = new FindProductByNameService(
      productRepository,
    );
    const product = await findProductByNameService.execute(name);
    return response.json(product);
  }
}
