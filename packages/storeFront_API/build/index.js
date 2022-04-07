"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var env_1 = require("./config/env");
app_1.app.listen(env_1.SERVER_URL, function () {
    return console.log("server listening on http://localhost:".concat(env_1.SERVER_URL, " \uD83D\uDE80"));
});
