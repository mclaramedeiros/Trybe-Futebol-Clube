import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedError from './UnauthorizedError';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const validateToken = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { authorization } = req.headers;
  try {
    const data = jwt.verify(authorization as string, secret) as {
      data: jwt.JwtPayload;
    };
    const { role } = JSON.parse(JSON.stringify(data));
    return res.status(200).json({ role });
  } catch {
    throw new UnauthorizedError('Token must be a valid token');
  }
};

export default validateToken;
