import express from "express";
import validationController from "../controller/validation.controller.js";
import { validationSchema } from "../dto/validation.dto.js";
import { validateResponse } from "../middleware/validateResponse.middleware.js";
const validationRouter = express.Router();

validationRouter
  .route("/")
  .post(validateResponse(validationSchema), validationController.validateCode);

export default validationRouter;
