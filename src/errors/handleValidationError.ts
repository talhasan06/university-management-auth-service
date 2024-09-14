import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    const error = el as mongoose.Error.ValidatorError; // Casting the type explicitly
    return {
      path: error?.path,
      message: error?.message,
    };
  });
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  };
};

export default handleValidationError;
