import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { Client } from "pg";

import { errorHandler, validateRequestBody, logger } from "../utils";
import { dbOptions, createProductQuery, createCountQuery } from "../constants";
import { ProductBaseSchema } from "../models";

const createProduct: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent,_context: Context): Promise<APIGatewayProxyResult> => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { title, description, price, count = 0 } = JSON.parse(event.body);
    logger('POST',title, description, price, count)
    validateRequestBody(ProductBaseSchema, {title,description,price,count,});
    let createdProduct: any = await client.query(createProductQuery(title, description, price));
    if (!createdProduct) throw new Error(`Product was not created`);
    let currentCount = await client.query(createCountQuery(createdProduct["rows"][0].id, count));

    return {
      statusCode: 200,
      headers: {"Access-Control-Allow-Origin": "*"},
      body: JSON.stringify({
        ...createdProduct["rows"][0],
        count: currentCount["rows"][0].count,
      }),
    };
  } catch (error) {
    return errorHandler(error);
  } finally {
    client.end();
  }
};

export default createProduct;
