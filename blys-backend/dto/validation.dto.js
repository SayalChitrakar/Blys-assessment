import Joi from "joi";

export const validationSchema = Joi.object({
  code: Joi.string().min(6).max(6).pattern(/^\d+$/).required().messages({
    "string.min": "Code must be atleast 6 character long.",
    "string.empty": "Code must be atleast 6 character long.",
    "string.pattern.base": "Code must only contain numeric value.",
    "string.max": "Code must be maximum 6 character long.",
    "any.required": "Code is required.",
  }),
});
