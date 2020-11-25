

const validateRequestBody = (model, body) => {
  const validationResult = model.validate(body);
  if (validationResult.error) {
    throw new Error(`${validationResult.error}`);
  }
};

export {validateRequestBody}
