import { Request, Response } from 'express';

import AuthUserService from '../services/AuthUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUser = new AuthUserService();

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
