import 'dotenv/config';
import 'reflect-metadata';

import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running on port 3333...');
});
