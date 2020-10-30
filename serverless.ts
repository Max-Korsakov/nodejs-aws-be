import type { Serverless } from "serverless/aws";

const serverlessConfiguration: any = {
  service: {
    name: "products-service",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    documentation: {
    
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-aws-documentation"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    getProducts: {
      handler: "handler.getProducts",
      events: [
        {
          http: {
            method: "get",
            path: "product",
            cors: true,
          },
        },
      ],
    },
    getProductById: {
      handler: "handler.getProductById",
      events: [
        {
          http: {
            method: "get",
            path: "product/{id}",
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
