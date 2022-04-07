# Storefront Backend

<br>

## Prerequisites

---

**Node v16.x**

```
If you are using Volta for Node version management then you are set to go 🤘
```

**Postgres**

I recommend the [Postgres.app](https://postgresapp.com) for ease of use if you are on a Mac.

**Psql Command**

> This command needs to be executable to use the following scripts:

```
  create-dbs
  seed-db
  refresh-db
```

## For Windows users

---

There was an issue with NODE_ENV=test when running scripts that rely on setting of NODE_ENV. Causing seeding and the project tests to fail. cross-env package was added to possibly alleviate this issue but is not a guarantee. If this does not take care of issues with failing tests on your end, you will need to manually set the NODE_ENV=test before seeding db, as well as when testing.

<br>

## Get started

---

Install the dependencies...

```bash
yarn
```

Create .env for project configuaration...

```bash
cp .env.example > .env
```

- This will have the server running on **_port:4000_**
- as well as Postgres listening on the default port: **_5432_**

<br>

Create dev and test databases...

```bash
yarn create-dbs
```

Run migrations for both test and dev...

```bash
yarn migrate-up:test
yarn migrate-up:dev
```

Seed test db with fake data for development...

```bash
yarn seed-db
```

Start the storefront Api server with no previous data...

```bash
yarn start
```

Start the storefront Api server in development with seeded fake data...

```bash
yarn dev
```

<br>

## Scripts

---

<br>

Start the server ...

```bash
yarn start
```

Start the server in development mode. (Will be connected to test db with fake seed data) ...

```bash
yarn dev
```

Run Jasmine Tests...

```
yarn test
```

Compile TS Server to JS ...

> _will create and place code in dist directory_

```
yarn build
```

Create databases for production and testing...

```
yarn create-dbs
```

Drop existing databases and create new production/testing databases with newly seeded data...

```
yarn refresh-db
```

Seed test database with fake...

```
yarn refresh-db
```

<br>

# API

[API](/REQUIREMENTS.md#API) located here ...
