import { Request, Response } from 'express';

import ListUsersService from '../services/ListUsersService';
import FindUserService from '../services/FindUserService';
import CreateUserService from '../services/CreateUserService';
import AddOrRemoveStockService from '../services/AddOrRemoveStockService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return res.json(users.map(user => ({ ...user, password: null })));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUser = new FindUserService();

    const user = await findUser.execute({ id });

    return res.json({
      ...user,
      password: null,
    });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return res.json({
      ...user,
      password: null,
    });
  }

  public async favorite(req: Request, res: Response): Promise<Response> {
    const { userId, stockId } = req.body;

    const addOrRemoveStock = new AddOrRemoveStockService();

    const user = await addOrRemoveStock.execute({ userId, stockId });

    return res.json({
      ...user,
      password: null,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name, email, password, newPassword,
    } = req.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id, name, email, password, newPassword,
    });

    return res.json({
      ...user,
      password: null,
    });
  }
}
