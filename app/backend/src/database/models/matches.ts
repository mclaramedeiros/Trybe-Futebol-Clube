import { Model, BOOLEAN, INTEGER } from 'sequelize';
import db from '.';
// import teams from './teams';

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
// teams.belongsTo(matches, { foreignKey: 'id', as: 'homeTeam' });
// teams.belongsTo(matches, { foreignKey: 'id', as: 'teamAway' });

// matches.hasMany(teams, { foreignKey: 'id', as: 'homeTeam' });
// matches.hasMany(teams, { foreignKey: 'id', as: 'teamAway' });

export default Matches;
