import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import UnauthorizedError from '../middlewares/UnauthorizedError';
import { iLogin } from '../interface/iLogin';
import users from '../database/models/users';
import BadRequest from '../middlewares/BadRequest';
// import { type } from 'os';

const secret = process.env.JWT_SECRET || 'secret';

type Error = {
  status: number;
  message: string;
};
const loginService = {
  async validateLogin(body: iLogin): Promise<string | Error> {
    if (!body.password || !body.email) {
      // return { message: 'All fields must be filled', error: 400 };
      throw new BadRequest('All fields must be filled');
    }
    const user = await users.findOne({
      where: { email: body.email },
    });
    if (!user) {
      throw new UnauthorizedError('Incorrect email or password');
    }
    if (!bcrypt.compareSync(body.password, user.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const { password, ...userWithoutPassword } = user;

    const token = jwt.sign(userWithoutPassword, secret);
    return token;
  },
};

// return res.status(401).json({ message: 'Incorrect email or password' });

export default loginService;
