

## AWS Data

CloudFront Adress

[https://d1j0a2cxkc2yn9.cloudfront.net/](https://d1j0a2cxkc2yn9.cloudfront.net/)

## Tasks

1.Create a lambda functions under the same serverless.yml - done (Used serverless.json to specify types, because used typesctipt)

- endpoints:
  GET - https://320ihl0yyc.execute-api.eu-west-1.amazonaws.com/dev/product
  GET - https://320ihl0yyc.execute-api.eu-west-1.amazonaws.com/dev/product/{id}

- functions:
  getProducts: products-service-dev-getProducts
  getProductById: products-service-dev-getProductById

2. The getProducts lambda function returns a correct response - done (Application main page)
   The getProductById lambda function returns a correct response - done (Application product page)

Additional  tasks :

- Async/await is used in lambda functions (delay request imitation in handlers) - done
- ES6 modules are used for product-service implementation - done
- Webpack is configured for product-service - done 
- SWAGGER documentation is created for product-service -dene (see swagger.json)
- Lambda handlers are covered by basic UNIT tests - done
- Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase. - done
- Main error scenarious are handled by API - done  (see error handler)

FE repository
[https://github.com/Max-Korsakov/nodejs-aws-fe](FE repository)

