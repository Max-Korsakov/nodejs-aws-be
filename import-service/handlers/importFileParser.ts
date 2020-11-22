import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import * as csv from "csv-parser";
import * as AWS from "aws-sdk";

import { s3 } from "../constants";

const bucket = process.env.BUCKET

const importFileParser: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const sqs = new AWS.SQS();
  try {
    await Promise.all(
      (event as any).Records.map(async (record) => {
        let params = {
          Bucket: bucket,
          Key: record.s3.object.key,
        };
        await new Promise((resolve, reject) => {
          s3.getObject(params)
            .createReadStream()
            .pipe(csv())
            .on("data", (data) => {
              sqs.sendMessage(
                {
                  QueueUrl: process.env.SQS_URL,
                  MessageBody: JSON.stringify(data),
                },
                (error, d) => {
                  console.log(JSON.stringify(data), ` was sent`);
                  console.log(error, d);
                }
              );
            })
            .on("error", (error) => {
              console.log(error);
              reject();
            })
            .on("end", async () => {
              let copyParams = {
                Bucket: bucket,
                CopySource: `${bucket}/${record.s3.object.key}`,
                Key: record.s3.object.key.replace("uploaded", "parsed"),
              };
              let deleteParams = {
                Bucket: bucket,
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
