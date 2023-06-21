import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
  
  private repository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.repository.find(input.id) as Product;

    product.changeName(input.name);
    await this.repository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}
