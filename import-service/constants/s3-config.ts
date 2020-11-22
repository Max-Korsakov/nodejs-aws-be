import * as AWS from "aws-sdk";

const secretAccessKey = process.env.MY_AWS_SECRET_KEY;
const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID;

const s3Config = {
  secretAccessKey,
  accessKeyId,
  region: 'eu-west-1',
  signatureVersion: 'v4'
}

const s3 = new AWS.S3({
  secretAccessKey,
  accessKeyId,
  region: 'eu-west-1',
  signatureVersion: 'v4'
});

export { s3, s3Config };
