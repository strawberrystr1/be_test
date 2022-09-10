import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  role: Joi.string()
})

export const findUserSchema = Joi.object({
  name: Joi.string().required(),
})