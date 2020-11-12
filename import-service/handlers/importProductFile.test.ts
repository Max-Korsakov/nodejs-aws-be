import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";

import { importProductsFile } from "../handler";

it("importProductsFile should call s3 getSignedUrl with putObject and Key equal 'uploaded/${name}' ", async () => {
  AWSMock.setSDKInstance(AWS);
  AWSMock.mock("S3", "getSignedUrl", async (calledObj, params) => {
    expect(calledObj).toBe("putObject");
    expect(params.Key).toBe("uploaded/mockName");
  });
  let event: any = { queryStringParameters: { name: "mockName" } };
  importProductsFile(event, null, null);
});
