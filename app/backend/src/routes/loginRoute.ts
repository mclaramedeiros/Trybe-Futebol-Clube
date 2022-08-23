import { Router } from 'express';
import userController from '../controllers/userController';

const loginRouter = Router();

loginRouter.post('/', userController.login);
// loginRouter.get('/validate', validateController);
// loginRouter.get('/', userController.role);

export default loginRouter;
