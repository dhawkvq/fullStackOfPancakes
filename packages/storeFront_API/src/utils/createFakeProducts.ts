import { Product } from "../types";
import { createFakeProduct } from "./createFakeProduct";

export const createFakeProducts = async (
  length: number
): Promise<Product[]> => {
  try {
    const productsArray = await Promise.all(
      Array.from({ length }).map(() => createFakeProduct())
    );
    return productsArray;
  } catch (error) {
    throw new Error(`problem creating fake users. ${error}`);
  }
};
