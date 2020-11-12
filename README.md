

## AWS Data

CloudFront Adress

[https://d1j0a2cxkc2yn9.cloudfront.net/](https://d1j0a2cxkc2yn9.cloudfront.net/)

## Tasks

Reviewers should verify the lambda functions by invoking them through provided URLs.

1 - File serverless.yml contains configuration for importProductsFile function - done
3 - The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket - done
4 - Frontend application is integrated with importProductsFile lambda - done
5 - The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda - done

Additional (optional) tasks
+1 - async/await is used in lambda functions - done
+1 - importProductsFile lambda is covered by unit tests (aws-sdk-mock can be used to mock S3 methods - done
+1 - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into parsed folder, and then deleted from uploaded folder) - done

FE repository
[https://github.com/Max-Korsakov/nodejs-aws-fe/](https://github.com/Max-Korsakov/nodejs-aws-fe/)

