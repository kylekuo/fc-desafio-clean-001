import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a proct type a", () => {
    const product = ProductFactory.create({ type: "a", name: "Product A",  price: 1 });

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a proct type b", () => {
    const product = ProductFactory.create({ type: "b", name: "Product B", price: 1 });

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create({ type: "c", name: "Product C", price: 1 }))
      .toThrowError("Product type not supported");
  });
});
