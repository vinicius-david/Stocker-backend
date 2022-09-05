import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    process.env.MODE === 'dev' ? 'src/models/*{.ts,.js}' : 'build/models/*{.ts,.js}',
  ],
  migrations: [
    process.env.MODE === 'dev' ? 'src/database/migrations/*{.ts,.js}' : 'build/database/migrations/*{.ts,.js}',
  ],
});

dataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
