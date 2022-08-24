import 'dotenv/config';
import Team from '../database/models/teams';

type teamTypes = {
  id: number;
  name: string;
};

const getAll = async (): Promise<teamTypes[]> => {
  const teams = await Team.findAll({
    raw: true,
  });
  return teams as unknown as teamTypes[];
};

export default getAll;
