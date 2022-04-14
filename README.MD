# FullStackOfPancakes

[![CircleCI](https://circleci.com/gh/dhawkvq/fullStackOfPancakes/tree/master.svg?style=svg)](https://circleci.com/gh/dhawkvq/fullStackOfPancakes/tree/master)

This mono-repo is set up to for CI/CD of both the front-end storeFront Angular app as well as the backend Node.js server.

## Prerequisites

<br>

**Node version 16.x**

```
  If you use volta for node management you are set to go.
```

<br>

## Set Up Project

**Install dependencies for both the front-end and back-end application**

```
npm i
```

<br>

## Scripts

Start the Node server in watch mode:

```
npm run dev:server
```

Start the front-end dev webpack server:

```
npm run dev:frontend
```

Bundle the back-end server:

```
npm run build:server
```

Bundle the front-end application:

```
npm run build:frontend
```

<br>
<br>

# Further Reading

[Application Infrastructure](./documentation/infrastructure.MD) gives a high level overview of the application.
