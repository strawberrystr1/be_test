import Joi from "joi";

export const createMeetupSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  description: Joi.string().required(),
  place: Joi.string().required(),
  theme: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  createdby: Joi.number().required()
});

export const updateMeetupSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  date: Joi.date(),
  description: Joi.string(),
  place: Joi.string(),
  theme: Joi.string(),
  tags: Joi.array().items(Joi.string())
})