import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedError from './UnauthorizedError';
// import UnauthorizedError from './UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    jwt.verify(authorization as string, secret);
    next();
  } catch {
    throw new UnauthorizedError('Token must be a valid token');
  }
};

export default verifyToken;
