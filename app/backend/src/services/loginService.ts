import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import UnauthorizedError from '../middlewares/UnauthorizedError';
import { iLogin } from '../interface/iLogin';
import users from '../database/models/users';
import BadRequest from '../middlewares/BadRequest';
// import { type } from 'os';
// import { VerifyToken } from '../helpers/jwt';

const secret = process.env.JWT_SECRET || 'jwt_secret';

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
      raw: true,
    });
    if (!user) {
      throw new UnauthorizedError('Incorrect email or password');
    }
    if (!bcrypt.compareSync(body.password, user.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }
    // aqui e onde tiro minha password
    // const { password, ...userWithoutPassword } = user;

    const token = jwt.sign(user, secret);
    return token;
  },
  // async validateToken(headers: string): Promise<string | Error> {
  //   const token = VerifyToken;
  //   const { role } = JSON.parse(JSON.stringify(data));
  //   if()

  // },
};

// return res.status(401).json({ message: 'Incorrect email or password' });

export default loginService;
