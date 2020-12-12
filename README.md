

## AWS Data

CloudFront Adress 

[https://d1j0a2cxkc2yn9.cloudfront.net/](https://d1j0a2cxkc2yn9.cloudfront.net/)

## Tasks

Evaluation criteria (each mark includes previous mark criteria)
Provide your reviewers with the link to the repo, product and CART services URLs and bff-service URL

- 3 - A working and correct express application should be in the bff-service folder. - done 

[https://github.com/Max-Korsakov/nodejs-aws-be/tree/task-7/bff-service](https://github.com/Max-Korsakov/nodejs-aws-be/tree/task-7/bff-service)

- 5 - The bff-service should be deployed with Elastic Beanstalk. The bff-service call should be redirected to the appropriate service. The response from the bff-service should be the same as if the recipient service was called directly. - done

[http://max-korsakov-bff-api-development.eu-west-1.elasticbeanstalk.com/](http://max-korsakov-bff-api-development.eu-west-1.elasticbeanstalk.com/)


Additional (optional) tasks
- +1 - Add a cache at the bff-service level for a request to the getProductsList function of the product-service. The cache should expire in 2 minutes. - done
How to test:
Get products list
Create new product
Get products list - result shouldn’t have new product
Wait more than 2 minutes

Get products list - result should have new product
- +1 - Use NestJS to create bff-service instead of express - done

[https://github.com/Max-Korsakov/nodejs-aws-be/tree/task-7/bff-service-nest](https://github.com/Max-Korsakov/nodejs-aws-be/tree/task-7/bff-service-nest)

FE repository
[https://github.com/Max-Korsakov/nodejs-aws-fe/](https://github.com/Max-Korsakov/nodejs-aws-fe/)

