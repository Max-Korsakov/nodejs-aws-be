import "source-map-support/register";

import getProducts from "./handlers/getProducts";
import getProductById from "./handlers/getProductById";
import createProduct from './handlers/createProduct';

export { getProducts, getProductById, createProduct };
