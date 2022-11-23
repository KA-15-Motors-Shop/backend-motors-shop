import { Response } from 'express';
export default class AppError {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
