import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    // Only because we are extending a built-in-class of typescrpt
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.type === "field" ? err.path : "field not identified",
      };
    });
  }
}
