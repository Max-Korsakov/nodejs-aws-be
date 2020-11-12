import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";

import { Client } from "pg";

import { errorHandler, LambdaError,logger } from "../utils";
import { DatabaseConstantQueries, dbOptions } from "../constants";

const getProductById: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const client = new Client(dbOptions);
  await client.connect();
  const { id } = event.pathParameters;
  try {
    logger('GET', id)
    let product = await client.query(
      `${DatabaseConstantQueries.getProductById}'${id}'`
    );
    if (!product["rows"][0]) throw new LambdaError("Product not found", 404);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(product["rows"][0]),
    };
  } catch (error) {
    return errorHandler(error);
  } finally {
    client.end();
  }
};

export default getProductById;
