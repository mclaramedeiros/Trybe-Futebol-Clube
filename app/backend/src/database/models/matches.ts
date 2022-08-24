import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}
Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      // field: 'home_team',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      // field: 'home_team_goals',
    },
    awayTeamGoals: {
      // field: 'away_team_goals',
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      // field: 'in_progress',
      allowNull: false,
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'teamAway' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
