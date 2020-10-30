import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";

import { productList } from "../mock/productsMock";
import { errorHandler, asyncRequestSimulation } from "../utils";

const getProductById: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    //async operation simulation
    const products = await asyncRequestSimulation(100, productList);
    const product = products.find((product) => {
      if (product.id === id) {
        return product;
      }
    });
console.log()
    if (!product) throw new Error("Product not found");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(product),
    };
  } catch (error) {
    return errorHandler(error, 404);
  }
};

export default getProductById;
