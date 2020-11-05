

## AWS Data

CloudFront Adress

[https://d1j0a2cxkc2yn9.cloudfront.net/](https://d1j0a2cxkc2yn9.cloudfront.net/)

## Tasks

1 - Task 4.1 is implemented - done (see add-data-scripts.sql)
3 - TASK 4.2 is implemented lambda links are provided and returns data - done
4 - TASK 4.3 is implemented lambda links are provided and products is stored in DB (call TASK 4.2 to see the product)
5 - Your own Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. Link to a working Front-End application is provided for cross-check reviewer.

endpoints:
  - get all products GET - https://320ihl0yyc.execute-api.eu-west-1.amazonaws.com/dev/product
  - get product by id GET - https://320ihl0yyc.execute-api.eu-west-1.amazonaws.com/dev/product/{id}
  - create product POST - https://320ihl0yyc.execute-api.eu-west-1.amazonaws.com/dev/product


Additional  tasks :

- POST/products lambda functions returns error 400 status code if product data is invalid - done (see custom error class and error handler)
- All lambdas return error 500 status code on any error (DB connection, any unhandled error in code) -  done (see custom error class and error handler)
- All lambdas do console.log for each incoming requests and their arguments done (see logger)
- Transaction based creation of products - done

FE repository
[https://github.com/Max-Korsakov/nodejs-aws-fe/](https://github.com/Max-Korsakov/nodejs-aws-fe/)

