import { Request, Response, NextFunction } from 'express';
import { emailRegex } from '../helpers/regex';

function loginValidate(req: Request, res: Response, next: NextFunction) {
  const userEmail = req.body.email;
  const result = req.body.password;
  if (!result || !userEmail) {
    // return { message: 'All fields must be filled', error: 400 };
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!emailRegex.test(userEmail) || result.length < 6) {
    // return { message: 'Incorrect email or password', error: 401 };
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
}
export default loginValidate;
