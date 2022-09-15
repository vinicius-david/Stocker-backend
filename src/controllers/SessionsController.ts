import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';

import AuthUserService from '../services/AuthUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const usersRepository = new UsersRepository();
    const authUser = new AuthUserService(usersRepository);

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      ...user,
      password: null,
    };

    return res.json({
      user: userWithoutPassword,
      token,
    });
  }
}
