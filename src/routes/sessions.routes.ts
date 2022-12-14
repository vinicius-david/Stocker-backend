import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();

const sessionsRouter: Router = Router();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
