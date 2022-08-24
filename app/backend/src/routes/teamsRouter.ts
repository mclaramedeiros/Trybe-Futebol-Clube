import { Router } from 'express';
// import { validateToken } from '../middlewares/validateToken';
import teamsController from '../controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.getItem);
// teamsRouter.get('/', userController.role);

export default teamsRouter;
