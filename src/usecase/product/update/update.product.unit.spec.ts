import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create( 'a', 'product', 10 );

const input = {
  id: product.id,
  name: product.name,
  price: product.price
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const updateUseCase = new UpdateProductUseCase(repository);
    const output = await updateUseCase.execute(input);
    expect(output).toEqual(input);
  });
});
