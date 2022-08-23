import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import userController from '../controllers/userController';

const loginRouter = Router();

loginRouter.get('/validate', validateToken);
loginRouter.post('/', userController.login);
// loginRouter.get('/', userController.role);

export default loginRouter;
