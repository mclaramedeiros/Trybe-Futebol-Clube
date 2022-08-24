import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

type matchesTypes = {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
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
};

export default matchesService;
