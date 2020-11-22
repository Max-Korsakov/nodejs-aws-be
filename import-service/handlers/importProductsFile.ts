import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";

import { s3Config } from "../constants";
import * as AWS from "aws-sdk";

const importProductsFile: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  let s3  = new AWS.S3(s3Config);
  const name = event.queryStringParameters.name;
  let params = {
    Bucket: "node-aws-import",
    Key: `uploaded/${name}`,
    Expires: 10000,
    ContentType: "text/csv",
  };
  try {
    let signedUrlPut = await s3.getSignedUrl("putObject", params);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(signedUrlPut),
    };
  } catch (error) {
    console.log(error);
  }
};

export default importProductsFile;
