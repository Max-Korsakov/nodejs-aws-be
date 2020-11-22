import {LambdaError} from './';


const errorHandler = (error: Error | LambdaError) => {
  let errorResponce;
  if(error instanceof LambdaError){
    errorResponce = {
      statusCode: error.statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(error.message),
    }
  } else {
    errorResponce = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(error.message ? error.message : error),
    }
  }
  return errorResponce
};

export default errorHandler;
