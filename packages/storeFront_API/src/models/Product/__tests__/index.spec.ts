import { addProduct, getProductById, allProducts } from "../ProductModel";

describe("models/Product addProduct", () => {
  it("returns a product that is of type Product", async () => {
    // price is entered in cents for ease of formatting price.
    const newProduct = await addProduct("loveSac", 200000);
    expect(newProduct.name).toBeInstanceOf(String);
    expect(newProduct.name).toBe("loveSac");
    expect(newProduct.price).toBeInstanceOf(Number);
    expect(newProduct.price).toBe(200000);
    expect(newProduct.id).toBeInstanceOf(Number);
  });
});

describe("models/Product getProductById", () => {
  it("returns a single product of type Product", async () => {
    const { id } = await addProduct("turbski", 400000);
    const product = await getProductById(id);
    expect(product.name).toBeInstanceOf(String);
    expect(product.price).toBeInstanceOf(Number);
    expect(product.id).toBeInstanceOf(Number);
  });
});

describe("models/Product allProducts", () => {
  it("returns an array of products", async () => {
    const products = await allProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products).toBeInstanceOf(Array);
  });
});
