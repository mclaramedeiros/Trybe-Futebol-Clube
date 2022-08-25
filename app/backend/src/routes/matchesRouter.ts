import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getMatches);
matchesRouter.post('/', matchesController.createMatches);
matchesRouter.patch('/:id/finish', matchesController.patchMatches);

// matchesRouter.get('/', matchesController.role);

export default matchesRouter;
