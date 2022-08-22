import { Router } from 'express';
import userController from '../controllers/userController';
import loginValidate from '../middlewares/loginValitation';

const loginRouter = Router();

loginRouter.post('/', loginValidate, userController.login);

export default loginRouter;
