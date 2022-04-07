import { pgDb } from "../../DB";
import { Product } from "../../types";

class ProductModel {
  /**
   * @param price - input price should be in cents
   **/
  async addProduct(name: string, price: number): Promise<Product> {
    try {
      const res = await pgDb.query(
        `
        INSERT INTO products (name,price) 
        VALUES($1,$2) 
        RETURNING *
      `,
        [name, price]
      );
      return res.rows[0];
    } catch (error) {
      throw new Error(`unable to add new product. ${error}`);
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const res = await pgDb.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);
      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to grab product by id. ${error}`);
    }
  }

  async allProducts(): Promise<Product[]> {
    try {
      const res = await pgDb.query("SELECT * FROM products");
      return res.rows;
    } catch (error) {
      throw new Error(`failed to grab all products. ${error}`);
    }
  }
}

export const { addProduct, getProductById, allProducts } = new ProductModel();
