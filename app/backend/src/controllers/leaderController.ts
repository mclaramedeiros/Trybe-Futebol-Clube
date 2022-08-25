import { Request, Response } from 'express';
import leaderService from '../services/leaderService';

export default class leaderController {
  static async filterAll(_req: Request, res: Response) {
    const data = await leaderService.filterAll();
    res.status(200).json(data);
  }
}
