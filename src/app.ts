import express, { Request, Response, NextFunction } from 'express';
import AppError from './errors/AppError';
import routes from './routes';
import cors from 'cors';
import 'reflect-metadata';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, _:NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  };

  console.error('error:', err);

  return res.status(500).json({
    status: 'error',
    message: "Internal server error"
  });
});

export default app;
