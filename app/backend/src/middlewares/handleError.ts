import { NextFunction, Request, Response } from 'express';

interface HandleError extends Error {
  code: number;
}

export default function handleError(
  error: HandleError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.status(error.code || 500).json({ message: error.message });
}
