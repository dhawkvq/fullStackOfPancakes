import { Router } from "express";
import { allUsers, addUser, getUserById } from "../models";
import { logger } from "../config";
import { assertNumber, assertString } from "../utils/assert";
import { signIn } from "../models/User/UserModel";
import { auth } from "../middleware/auth";

export const usersRouter = Router();

// Return all users
usersRouter.get("/", auth, async (_, res, next) => {
  try {
    const users = await allUsers();
    res.send(users);
  } catch (error) {
    logger.error(`failed to fetch all users. ${error}`);
    res.statusCode = 500;
    next(error);
  }
});

// Return user by id
usersRouter.get("/:userId", auth, async (req, res, next) => {
  const params = req.params;
  try {
    const userId = assertNumber(params.userId);
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Create new user - Return JWT token
usersRouter.post("/", auth, async (req, res, next) => {
  try {
    const firstName = assertString(req.body.firstName);
    const lastName = assertString(req.body.lastName);
    const password = assertString(req.body.password);
    const { jwt } = await addUser(firstName, lastName, password);
    res.statusCode = 201;
    res.send({ token: jwt });
  } catch (error) {
    logger.error(`failed to create user. ${error}`);
    next(error);
  }
});

// User sign in - Return JWT Token
usersRouter.post("/signIn", async (req, res, next) => {
  try {
    const firstName = assertString(req.body.firstName);
    const lastName = assertString(req.body.lastName);
    const password = assertString(req.body.password);
    const jwtToken = await signIn(firstName, lastName, password);
    res.statusCode = 200;
    res.send({ token: jwtToken });
  } catch (error) {
    logger.error(`failed to sing in user. ${error}`);
    next(error);
  }
});
