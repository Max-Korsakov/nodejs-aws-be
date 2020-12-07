import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
  Context,
  Callback,
} from "aws-lambda";
import "source-map-support/register";

enum ResponseStatus {
  Allow = "Allow",
  Deny = "Deny",
  Unauthorized = "Unauthorized",
}

const getneratePolicy = (
  principalId: string,
  resource: string,
  effect = ResponseStatus.Deny
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent,
  _context: Context,
  cb: Callback<APIGatewayAuthorizerResult>
) => {
  if (event["type"] != "TOKEN") {
    cb(new Error());
  }
  try {
    const authToken = event.authorizationToken;
    const encodedCreds = authToken.split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8").split(":");
    const username = plainCreds[0];
    const password = plainCreds[1];

    const storedUserPassword = process.env[username];
    let effect =
      !storedUserPassword || storedUserPassword != password
        ? ResponseStatus.Deny
        : ResponseStatus.Allow;
    if (!username || !password) {
      cb("Unauthorized");
    }

    const policy = getneratePolicy(encodedCreds, event.methodArn, effect);

    cb(null, policy);
  } catch (error) {
    cb("Unauthorized");
    console.log(error);
  }
};

export default basicAuthorizer;
