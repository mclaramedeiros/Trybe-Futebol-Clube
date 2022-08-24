import 'dotenv/config';
import Team from '../database/models/teams';

type teamTypes = {
  id: number;
  name: string;
};
const teamsService = {
  async getAll(): Promise<teamTypes[]> {
    const teams = await Team.findAll({
      raw: true,
    });
    return teams as unknown as teamTypes[];
  },
  async getItem(id: number): Promise<teamTypes[]> {
    const team = await Team.findOne({
      where: { id },
      raw: true,
    });
    return team as unknown as teamTypes[];
  },
};

export default teamsService;
