import * as Joi from 'joi';

const ProductBaseSchema = Joi.object({
    title: Joi.string().required(),
    description:  Joi.string().required(),
    price:  Joi.number().required(),
    count: Joi.number()
  })

export {ProductBaseSchema};