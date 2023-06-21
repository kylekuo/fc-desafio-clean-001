import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {

  private repository: ProductRepositoryInterface;
  
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.repository.findAll();
    return OutputMapper.toOutput(products as Product[]);
  }
}

class OutputMapper {
  static toOutput(product: Product[]): OutputListProductDto {
    return {
      products: product.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }) as Product),
    };
  }
}
