import { ResponseFormat } from "../helper/responseFormat.helper.js";
export const validateResponse = (schema) => {
  const responseFormat = new ResponseFormat();
  return (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      return responseFormat.sendBadRequestResponse(response, error.message);
    }
    next();
  };
};
