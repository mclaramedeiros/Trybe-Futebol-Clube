import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

export default class teamsController {
  static async getAll(_req: Request, res: Response) {
    const teams = await teamsService.getAll();
    return res.status(200).json(teams);
  }

  static async getItem(req: Request, res: Response) {
    const { id } = req.params;
    const team = await teamsService.getItem(+id);
    return res.status(200).json(team);
  }
}
