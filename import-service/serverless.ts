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
    stage: "dev",
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
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: {
          "Fn::GetAtt": ["SQSQueue", "Arn"],
        },
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: {
          Ref: "SNSTopic",
        },
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      PG_PORT: 5432,
      PG_DATABASE: "lesson4",
      PG_USERNAME: "postgres",
      BUCKET: "node-aws-import",
      SQS_URL: {
        Ref: "SQSQueue",
      },
      SNS_ARN: {
        Ref: "SNSTopic",
      },
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "catalogItemsQueueTopic",
        },
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "adwuno@gmail.com",
          Protocol: "email",
          FilterPolicy: { count:[{"numeric": ["=", 0]}]},
          TopicArn: {
            Ref: "SNSTopic",
          },
        },
        
      },
      SNSNonZeroSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "engramby@gmail.com",
          Protocol: "email",
          FilterPolicy: { count:[{"numeric": [">=", 1]}]},
          TopicArn: {
            Ref: "SNSTopic",
          },
        },
        
      },
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
      events: [
        {
          s3: {
            bucket: "node-aws-import",
            event: "s3:ObjectCreated:*",
            rules: [{ prefix: "uploaded/", suffix: ".csv" }],
            existing: true,
          },
        },
      ],
    },

    catalogBatchProcess: {
      handler: "handler.catalogBatchProcess",
      events: [
        {
          sqs: {
            batchSize: 1,//change to 5
            arn: {
              "Fn::GetAtt": ["SQSQueue", "Arn"],
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
