import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import matchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getMatches);
matchesRouter.post('/', verifyToken, matchesController.createMatches);
matchesRouter.patch('/:id/', matchesController.updateMatches);
matchesRouter.patch('/:id/finish', matchesController.patchMatches);

// matchesRouter.get('/', matchesController.role);

export default matchesRouter;
