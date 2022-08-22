import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { iLogin } from '../interface/iLogin';
import users from '../database/models/users';

const secret = process.env.JWT_SECRET || 'secret';

const loginService = {
  async validateLogin(body: iLogin) {
    const user = await users.findOne({
      where: { email: body.email },
    });
    if (!user) {
      throw new Error();
    }
    const { password, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, secret);
    return token;
  },
};

// return res.status(401).json({ message: 'Incorrect email or password' });

export default loginService;
