import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getMatches);
// matchesRouter.get('/', matchesController.role);

export default matchesRouter;
