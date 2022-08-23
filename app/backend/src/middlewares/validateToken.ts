import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import ThrowError from './throwError';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const validateToken = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new ThrowError('Token Not Found');
  }
  const data = jwt.verify(authorization, secret) as { data: jwt.JwtPayload };
  const { role } = JSON.parse(JSON.stringify(data));
  if (!role) {
    throw new ThrowError('Token must be a valid token');
  }
  return res.status(200).json({ role });
};

export default validateToken;
