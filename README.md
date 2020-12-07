

## AWS Data

CloudFront Adress 

[https://d1j0a2cxkc2yn9.cloudfront.net/](https://d1j0a2cxkc2yn9.cloudfront.net/)

## Tasks

- 1 - authorization-service is added to the repo, has correct basicAuthorizer lambda and correct serverless.yaml file - done
- 3 - import-service serverless.yaml file has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. Response should be in 403 HTTP status if access is denied for this user (invalid authorization_token) and in 401 HTTP status if Authorization header is not provided. - done
- 5 - update client application to send Authorization: Basic authorization_token header on import. Client should get authorization_token value from browser localStorage https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage authorization_token = localStorage.getItem('authorization_token') - done

Additional (optional) tasks
- +1 - Client application should display alerts for the responses in 401 and 403 HTTP statuses. This behavior should be added to the nodejs-aws-fe-main/src/index.tsx file - done

FE repository
[https://github.com/Max-Korsakov/nodejs-aws-fe/](https://github.com/Max-Korsakov/nodejs-aws-fe/)

