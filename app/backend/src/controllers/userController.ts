import { Request, Response } from 'express';
import loginService from '../services/loginService';

export default class userController {
  static async login(req: Request, res: Response) {
    const result = await loginService.validateLogin(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.message });
    }
    // const token = await loginService.validateLogin(req.body);
    // console.log(result);
    return res.status(200).json({ token: result });
  }
}
