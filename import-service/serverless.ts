import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "import-service",
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
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-dotenv-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    stage:"dev",
    region: "eu-west-1",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "arn:aws:s3:::node-aws-import",
      },
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "arn:aws:s3:::node-aws-import/*",
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    importProductsFile: {
      handler: "handler.importProductsFile",
      events: [
        {
          http: {
            method: "get",
            path: "import",
            request: {
              parameters: {
                querystrings: {
                  name: true,
                },
              },
            },
            cors: true,
          },
        },
      ],
    },

    importFileParser: {
      handler: "handler.importFileParser",
      events: [{
        s3:{
          bucket:"node-aws-import",
          event: "s3:ObjectCreated:*",
          rules: [{prefix: "uploaded/", suffix: ".csv"}],
          existing: true
        }
      }]
    },
  },
};

module.exports = serverlessConfiguration;
