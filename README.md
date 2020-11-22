

## AWS Data

CloudFront Adress 

[https://d1j0a2cxkc2yn9.cloudfront.net/](https://d1j0a2cxkc2yn9.cloudfront.net/)

## Tasks

Reviewers should verify the lambda functions, SQS and SNS topic and subscription in PR.

- 1 - File serverless.yml contains configuration for catalogBatchProcess function - done
- 2 - File serverless.yml contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS - done
- 3 - File serverless.yml contains configuration for SQS catalogItemsQueue - done
- 4 - File serverless.yml contains configuration for SNS Topic createProductTopic and email subscription -dene

Additional (optional) tasks
- +1 - catalogBatchProcess lambda is covered by unit tests - done
- +1 - set a Filter Policy for SNS createProductTopic in serverless.yml (Create an additional email subscription and distribute messages to different emails depending on the filter for any product attribute) - done

FE repository
[https://github.com/Max-Korsakov/nodejs-aws-fe/](https://github.com/Max-Korsakov/nodejs-aws-fe/)

