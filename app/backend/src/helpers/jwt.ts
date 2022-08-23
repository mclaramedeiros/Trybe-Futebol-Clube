import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { iLogin } from '../interface/iLogin';

import NotFoundError from '../middlewares/UnauthorizedError';

const secret = process.env.JWT_SECRET || 'secret';

// const mesError = 'Token must be a valid token';

export default class tokenProvider {
  createToken = (data: iLogin) => {
    const token = jwt.sign(data, secret);
    return token;
  };

  readToken = (token: string) => {
    const data = jwt.verify(token, secret);
    return data;
  };

  verifyToken = (token: string) => {
    if (!token) {
      throw new NotFoundError('Token not found');
    }
    try {
      const data = jwt.verify(token, secret);
      return data;
    } catch (error) {
      throw new NotFoundError('Expired or invalid token');
    }
  };
}
