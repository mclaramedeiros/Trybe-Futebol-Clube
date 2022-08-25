import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
// import UnauthorizedError from './UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers as any;
  jwt.verify(authorization, secret);
  next();
};

export default verifyToken;
