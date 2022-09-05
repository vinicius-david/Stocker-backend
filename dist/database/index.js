"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [
        process.env.MODE === 'dev' ? 'src/models/*{.ts,.js}' : 'build/models/*{.ts,.js}',
    ],
    migrations: [
        process.env.MODE === 'dev' ? 'src/database/migrations/*{.ts,.js}' : 'build/database/migrations/*{.ts,.js}',
    ],
    migrationsRun: true,
});
dataSource.initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
})
    .catch(function (err) {
    console.error('Error during Data Source initialization', err);
});
exports.default = dataSource;
