import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

// const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class matchesController {
  static async getMatches(_req: Request, res: Response) {
    const matches = await matchesService.getMatches();
    return res.status(200).json(matches);
  }

  static async createMatches(req: Request, res: Response) {
    await matchesService.validateTeams(req.body);
    const createdMatches = await matchesService.createMatches(req.body);
    return res.status(201).json(createdMatches);
  }

  static async patchMatches(req: Request, res: Response) {
    const { id } = req.params;
    await matchesService.patchMatches(+id);
    res.status(200).json({ message: 'Finished' });
  }

  static async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchesService.updateMatches(+id, homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'updated' });
  }
  // static async validateTimes(req: Request, res: Response) {
  //   await matchesService.createMatches(req.body);
  //   return res.status(201).json(createdMatches);
  // }
}
