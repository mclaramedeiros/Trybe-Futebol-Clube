import { Request, Response } from 'express';
import loginService from '../services/loginService';

export default class userController {
  static async login(req: Request, res: Response) {
    const token = await loginService.validateLogin(req.body);
    res.status(200).json({ token });
  }
}
