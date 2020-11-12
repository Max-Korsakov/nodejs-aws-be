import { LambdaError } from "../utils";

const validateRequestBody = (model, body) => {
  const validationResult = model.validate(body);
  if (validationResult.error) {
    throw new LambdaError(`${validationResult.error}`, 400);
  }
};

export {validateRequestBody}
