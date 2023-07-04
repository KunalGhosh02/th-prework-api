import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  statusCode: number;
  constructor({
    message,
    statusCode,
  }: {
    message?: string;
    statusCode?: StatusCodes;
  }) {
    super();
    this.message = message || 'Something went wrong.';
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
