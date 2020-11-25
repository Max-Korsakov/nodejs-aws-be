import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { Client } from "pg";

import { catalogBatchProcess } from "../handler";


describe("59540432", () => {

  jest.mock("pg", () => {
    const mClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
  });

  let client;
  beforeEach(() => {
    client = new Client();
  });

  it("catalogBatchProcess should call sns publish with body data", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("SNS", "publish", async (calledWith) => {
      expect(calledWith.Subject).toBe("New product was added");
      expect(calledWith.Message).toBe(product);
    });
    let product = JSON.stringify({
      title: "mockTitle",
      description: "mockDescription",
      price: 10,
      count: 1,
    });
    let event: any = { Records: [{ body: product }] };
    client.query.mockResolvedValue({ rows: [{ id: "mockId" }], rowCount: 1 });
    catalogBatchProcess(event, null, null);
  });

  it("catalogBatchProcess should call database client", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("SNS", "publish", async (calledWith) => {
      expect(calledWith.Subject).toBe("New product was added");
      expect(calledWith.Message).toBe(product);
    });
    let product = JSON.stringify({
      title: "mockTitle",
      description: "mockDescription",
      price: 10,
      count: 1,
    });
    let event: any = { Records: [{ body: product }] };
    catalogBatchProcess(event, null, null);
    expect(client.connect).toBeCalled();
    expect(client.query).toBeCalled();
    expect(client.query).toBeCalledWith("insert into product (title, description, price) values ('mockTitle' , 'mockDescription', '10') returning *");
  });
});
