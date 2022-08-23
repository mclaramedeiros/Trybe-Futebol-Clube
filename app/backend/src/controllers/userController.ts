import { Request, Response } from 'express';
import loginService from '../services/loginService';

export default class userController {
  static async login(req: Request, res: Response) {
    const token = await loginService.validateLogin(req.body);
    return res.status(200).json({ token });
  }

  // static async role(req: Request, res: Response) {
  //   const role = await loginService.validateToken(req.headers);
  //   return res.status(200).json({ role });
  // }
}
