import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { Client } from "pg";

import { errorHandler, logger } from "../utils";
import {DatabaseConstantQueries, dbOptions} from '../constants';



const getProducts: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    logger('GET')
    let availableProducts = await client.query(DatabaseConstantQueries.getAllProducts);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(availableProducts["rows"]),
    };
  } catch (error) {
    return errorHandler(error);
  } finally {
    client.end();
  }
};

export default getProducts;
