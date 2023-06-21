import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create( 'a', 'Product', 10 );

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const usecase = new FindProductUseCase(repository);

    const input: InputFindProductDto = {
      id: product.id,
    };

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const repository = MockRepository();

    repository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new FindProductUseCase(repository);

    const input = { id: product.id };

    expect(() => usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
