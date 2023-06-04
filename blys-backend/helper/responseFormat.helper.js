export class ResponseFormat {
  sendSuccessResponse = (response, message) => {
    return response.status(200).json({
      status: "Success",
      message,
    });
  };

  sendBadRequestResponse = (response, message) => {
    return response.status(400).json({
      status: "Failed",
      message,
    });
  };

  sendInternalErrorResponse = (response) => {
    return response.status(500).json({
      status: "Failed",
      message: "Something went wrong.",
    });
  };
}
