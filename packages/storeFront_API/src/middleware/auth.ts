import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { isTest, jwtSecret } from "../config/env";
import { assertString } from "../utils/assert";
import { logger } from "../config";

export const auth: RequestHandler = (req, res, next) => {
  if (isTest) return next();
  try {
    if (!req.headers.authorization) {
      res.statusCode = 401;
      throw new Error("Authorization Header is required");
    }
    const token = assertString(req.headers.authorization);
    verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.statusCode = 401;

        throw new Error(`jwt error. ${err}`);
      }
      logger.info(`auth passed for user: ${JSON.stringify(decoded)}`);
    });
    next();
  } catch (error) {
    logger.error(`auth error. ${error}`);
    next(error);
  }
};
