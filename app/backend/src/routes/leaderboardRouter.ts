import { Router } from 'express';
import leaderController from '../controllers/leaderController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderController.filterAll);
// loginRouter.get('/', userController.role);

export default leaderboardRouter;
