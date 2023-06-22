import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const usecase = new FindProductUseCase(repository);

    const product = new Product('123', 'Product', 10);

    await repository.create(product);

    const input: InputFindProductDto = {
      id: product.id,
    };

    const output: OutputFindProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});
