import { Context } from "aws-lambda";
import { dbOptions, createProductQuery, createCountQuery } from "../constants";
import { Client } from "pg";
import "source-map-support/register";

import * as AWS from "aws-sdk";

const catalogBatchProcess: any = async (event: any, _context: Context) => {
  const client = new Client(dbOptions);
  await client.connect();
  const sns = new AWS.SNS();
  try {
    await Promise.all(
      event.Records.map(async ({ body }) => {
        let data = JSON.parse(body);
        const { title, description, price, count = "0" } = data;
        await new Promise(async (resolve, reject) => {
          try {
            await client.query("BEGIN");
            let createdProduct: any = await client.query(
              createProductQuery(title, description, Number(price))
            );
            await client.query(
              createCountQuery(createdProduct["rows"][0].id, Number(count))
            );
            await client.query("COMMIT");
          } catch (e) {
            console.log(e)
            await client.query("ROLLBACK");
            reject();
          }
          console.log('before publish',body)
          sns.publish(
            {
              Subject: "New product was added",
              Message: body,
              TopicArn: process.env.SNS_ARN,
              MessageAttributes: {
                count: {
                  DataType: "Number",
                  StringValue: count,
                },
              },
            },
            (error, data) => {
              console.log(body)
              console.log("from publish", error, data);
              if (error) {
                reject();
              }
              resolve();
            }
          );
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default catalogBatchProcess;
