# Stocker - backend

> A simple app designed to shows the stocks market price from up to the last 20 years. Developed using NodeJS in typescript and the Alpha Vantage API.

### Technologies

- Typescript
- Node JS
- Docker
- PostgreSQL
- Jest
- CI/CD on Heroku

## Installing Stocker - backend

To install `Stocker - backend`, run:

```
yarn
```

Create a `.env` file in the project main folder following the `.envexample`.

For the `DATABASE_URL` variable, use the url to set up the connection to your database. Using Docker to create an image of a PostgreSQL database is the easiest way.

Run the migrations to your database using:

```
migration:run
```

Or revert them with:

```
migration:revert
```

## ☕ Using Stocker- backend

To run `Stocker - backend`, run:

```
yarn start
```

For more information on the Front-end in React, check-out the repository https://github.com/vinicius-david/Stocker-frontend
