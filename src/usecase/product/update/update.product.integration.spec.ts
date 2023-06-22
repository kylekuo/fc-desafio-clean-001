import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Test update product use case", () => {
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

	it("should update a product", async () => {
		const repository = new ProductRepository();
    const usecase = new UpdateProductUseCase(repository);
		
		const product = new Product ('123', 'Product one', 10);
		await repository.create(product);

		const input: InputUpdateProductDto = {
			id: product.id,
			name: 'Updated Product one',
			price: product.price
		}

		const result = await usecase.execute(input);

		const output = await usecase.execute(input);
		expect(output).toEqual(input);
	});
	
});
