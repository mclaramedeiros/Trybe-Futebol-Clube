import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

export default class matchesController {
  static async getMatches(_req: Request, res: Response) {
    const matches = await matchesService.getMatches();
    return res.status(200).json(matches);
  }

  //   static async getItem(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const team = await teamsService.getItem(+id);
  //     return res.status(200).json(team);
  //   }
}
