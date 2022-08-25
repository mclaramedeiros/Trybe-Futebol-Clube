import { Request, Response } from 'express';
// import { any } from 'joi';
import { validateToken } from '../middlewares/validateToken';
import matchesService from '../services/matchesService';

export default class matchesController {
  static async getMatches(_req: Request, res: Response) {
    const matches = await matchesService.getMatches();
    return res.status(200).json(matches);
  }

  static async createMatches(req: Request, res: Response) {
    await validateToken;
    await matchesService.validateTeams(req.body);
    const createdMatches = await matchesService.createMatches(req.body);
    return res.status(201).json(createdMatches);
  }

  static async patchMatches(req: Request, res: Response) {
    const { id } = req.params;
    await matchesService.patchMatches(+id);
    res.status(200).json({ message: 'Finished' });
  }

  // static async validateTimes(req: Request, res: Response) {
  //   await matchesService.createMatches(req.body);
  //   return res.status(201).json(createdMatches);
  // }
}
