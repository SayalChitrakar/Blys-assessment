import { ResponseFormat } from "../helper/responseFormat.helper.js";

class ValidationController extends ResponseFormat {
  constructor() {
    super();
  }

  validateCode = (request, response) => {
    try {
      const { code } = request.body;
     
      if (code.charAt(code.length - 1) === "7") {
        return this.sendBadRequestResponse(response, "Invalid code.");
      }
      return this.sendSuccessResponse(response, "Your Code is valid.");
    } catch (error) {
      return this.sendInternalErrorResponse(response);
    }
  };
}

export default new ValidationController();
