import Joi from 'joi';

export const employeeSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters long.',
    'any.required': 'Name is required.'
  }),
  position: Joi.string().min(2).required().messages({
    'string.base': 'Position must be a string.',
    'string.empty': 'Position is required.',
    'string.min': 'Position must be at least 2 characters long.',
    'any.required': 'Position is required.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.'
  }),
  branchId: Joi.number().integer().positive().required().messages({
    'number.base': 'Branch ID must be a number.',
    'number.positive': 'Branch ID must be a positive number.',
    'any.required': 'Branch ID is required.'
  }),
  department: Joi.string().required().messages({
    'string.base': 'Department must be a string.',
    'string.empty': 'Department is required.',
    'any.required': 'Department is required.'
  }),
  phone: Joi.string().required().messages({
    'string.base': 'Phone must be a string.',
    'string.empty': 'Phone is required.',
    'any.required': 'Phone is required.'
  })
});
