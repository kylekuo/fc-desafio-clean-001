import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

describe("Test create product use case", () => {
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

  it("should create a product", async () => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);

    const product = new Product('123', 'Product', 10);
    await repository.create(product);

    const input: InputCreateProductDto = {
      name: product.name,
      price: product.price,
    };

    const output: OutputCreateProductDto = {
      id: expect.any(String),
      name: product.name,
      price: product.price,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

	it("should thrown an error when name is missing", async () => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);

		const product = new Product('123', 'Product', 10);
		await repository.create(product);

		const input: InputCreateProductDto = {
      name: '',
      price: product.price,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price is less than zero", async () => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);

		const product = new Product('123', 'Product', 10);
		await repository.create(product);

		const input: InputCreateProductDto = {
      name: product.name,
      price: -10,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});
