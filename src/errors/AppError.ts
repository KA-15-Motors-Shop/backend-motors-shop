import { Response } from "express";

export default class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super()
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class HandleError {
  static execute (err: AppError, res: Response) {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    status: "error",
    message,
    statusCode
  });
}
};
