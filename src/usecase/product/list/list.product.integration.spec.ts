import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";


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

  it("should list products", async () => {
    const repository = new ProductRepository();
    const usecase = new ListProductUseCase(repository);

    const product1 = new Product ('123', 'Product one', 10),
    			product2 = new Product ('234', 'Product two', 20);

    await repository.create(product1);
    await repository.create(product2);

    const result = await usecase.execute({});

    expect(result.products.length).toBe(2);

    expect(result.products[0].id).toEqual(product1.id);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[0].price).toEqual(product1.price);

    expect(result.products[1].id).toEqual(product2.id);
    expect(result.products[1].name).toEqual(product2.name);
    expect(result.products[1].price).toEqual(product2.price);
  });
});
