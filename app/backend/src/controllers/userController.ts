import { Request, Response } from 'express';
import loginService from '../services/loginService';

export default class userController {
  static async login(req: Request, res: Response) {
    const result = await loginService.validateLogin(req.body);
    return res.status(200).json({ token: result });
  }
}
