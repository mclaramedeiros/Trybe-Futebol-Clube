// import ThrowError from '../middlewares/throwError';
import ThrowError from '../middlewares/throwError';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import { iMatches } from '../interface/iMatches';
import UnPossible from '../middlewares/unPossible';
import teamsService from './teamsService';

type matchesTypes = {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
};

const matchesService = {
  async getMatches(): Promise<matchesTypes[]> {
    const teams = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return teams as unknown as matchesTypes[];
  },
  async createMatches(matches: iMatches) {
    matches.inProgress = true;
    const data = await Matches.create(matches);
    return data;
  },
  async patchMatches(id: number) {
    await Matches.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
    return true;
  },
  async validateTeams(match: iMatches) {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new UnPossible(
        'It is not possible to create a match with two equal teams',
      );
    }
    const homeTeamExists = await teamsService.getItem(homeTeam);
    const awayTeamExists = await teamsService.getItem(awayTeam);
    if (!homeTeamExists || !awayTeamExists) {
      throw new ThrowError('There is no team with such id!');
    }
  },
};

export default matchesService;
