import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";

import { productList } from "../mock/productsMock";
import { errorHandler, asyncRequestSimulation } from "../utils";

const getProducts: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    //async request imitation
    const products = await asyncRequestSimulation(100, productList);
    const availableProducts = products.filter((product) => {
      if (product.count > 0) {
        return product;
      }
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(availableProducts),
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export default getProducts;
