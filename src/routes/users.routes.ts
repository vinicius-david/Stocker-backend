import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter: Router = Router();

usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.patch('/stock/', usersController.favorite);
usersRouter.put('/:id', usersController.update);

export default usersRouter;
