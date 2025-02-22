import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Custom Error Classes
class CustomError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized Access") {
    super(message, 401);
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string = "Forbidden Access") {
    super(message, 403);
  }
}

class NotFoundError extends CustomError {
  constructor(message: string = "Route not found") {
    super(message, 404);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500);
  }
}

// 🔹 NEW: Repository Error for Firestore Handling
class RepositoryError extends CustomError {
  constructor(message: string, error?: any) {
    super(message, 500);
    if (error) console.error("RepositoryError Details:", error);
  }
}

/**
 * Global Error Handling Middleware (Updated for Firestore)
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error Middleware Caught:", err.stack || err);

  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Handle Joi Validation Errors
  if (err instanceof ValidationError || err instanceof Joi.ValidationError) {
    statusCode = 400;
    message = err.message || "Validation Error";
  }

  // Handle Firestore Repository Errors
  if (err instanceof RepositoryError) {
    statusCode = 500;
    message = err.message || "Database Error";
  }

  // Ensure 404 Errors are Correctly Formatted
  if (statusCode === 404) {
    message = "Route not found";
  }

  // Ensure 500 Errors Are Handled Correctly
  if (!err.status || err.status === 200) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" ? { error: err.stack } : {}),
  });
};

// Export Custom Errors for Use in Controllers & Repositories
export {
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  RepositoryError, // 🔹 Now available for Firestore errors
};
