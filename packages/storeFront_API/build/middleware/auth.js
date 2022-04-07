"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../config/env");
var assert_1 = require("../utils/assert");
var config_1 = require("../config");
var auth = function (req, res, next) {
    if (env_1.isTest)
        return next();
    try {
        if (!req.headers.authorization) {
            res.statusCode = 401;
            throw new Error("Authorization Header is required");
        }
        var token = (0, assert_1.assertString)(req.headers.authorization);
        (0, jsonwebtoken_1.verify)(token, env_1.jwtSecret, function (err, decoded) {
            if (err) {
                res.statusCode = 401;
                throw new Error("jwt error. ".concat(err));
            }
            config_1.logger.info("auth passed for user: ".concat(JSON.stringify(decoded)));
        });
        next();
    }
    catch (error) {
        config_1.logger.error("auth error. ".concat(error));
        next(error);
    }
};
exports.auth = auth;
