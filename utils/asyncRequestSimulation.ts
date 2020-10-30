import { Product } from "../models";

const getDataWithDelay = (ms: number, data: Product[]): Promise<Product[]> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export default getDataWithDelay;
