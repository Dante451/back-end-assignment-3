import Joi from 'joi';

export const branchSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'Branch name must be a string.',
    'string.empty': 'Branch name is required.',
    'string.min': 'Branch name must be at least 3 characters long.',
    'any.required': 'Branch name is required.'
  }),
  address: Joi.string().min(5).required().messages({
    'string.base': 'Address must be a string.',
    'string.empty': 'Address is required.',
    'string.min': 'Address must be at least 5 characters long.',
    'any.required': 'Address is required.'
  }),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in valid international format (e.g., +1234567890).',
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number is required.'
    })
});
