import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationError } from "./errorMiddleware";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });

    if (error) {
      return next(new ValidationError(error.details.map((err) => err.message).join(", ")));
    }

    next();
  };
};
