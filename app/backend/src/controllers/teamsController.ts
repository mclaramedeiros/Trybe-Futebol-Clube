import { Request, Response } from 'express';
import getAll from '../services/teamsService';

export default class teamsController {
  static async getAll(_req: Request, res: Response) {
    const teams = await getAll();
    return res.status(200).json(teams);
  }
}
