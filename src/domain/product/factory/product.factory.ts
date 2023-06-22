import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

interface CreateProductInterface {
  type: string;
  name: string;
  price: number;
}

export default class ProductFactory {
  public static create (data: CreateProductInterface): ProductInterface {
    const { type, name, price } = data;
    const id = uuid();
    switch (type) {
      case "a":
        return new Product(id, name, price);
      case "b":
        return new ProductB(id, name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
