import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import * as csv from "csv-parser";

import { s3 } from "../constants";

const importFileParser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    await Promise.all(
      (event as any).Records.map(async (record) => {
        let params = {
          Bucket: "node-aws-import",
          Key: record.s3.object.key,
        };
        await new Promise((resolve, reject) => {
          s3.getObject(params)
            .createReadStream()
            .pipe(csv())
            .on("data", (data) => {
              console.log(data);
            })
            .on("error", (error) => {
              console.log(error);
              reject();
            })
            .on("end", async () => {
              let copyParams = {
                Bucket: "node-aws-import",
                CopySource: `node-aws-import/${record.s3.object.key}`,
                Key: record.s3.object.key.replace("uploaded", "parsed"),
              };
              let deleteParams = {
                Bucket: "node-aws-import",
                Key: record.s3.object.key,
              };
              await s3.copyObject(copyParams).promise();
              await s3.deleteObject(deleteParams).promise();
              resolve();
            });
        });
      })
    );
    return {
      statusCode: 202,
    } as any;
  } catch (error) {
    console.log(error);
  }
};

export default importFileParser;
