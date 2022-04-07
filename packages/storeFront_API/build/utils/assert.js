"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertStringOptional = exports.assertNumberOptional = exports.assertNumber = exports.assertString = void 0;
function assertString(arg) {
    if (typeof arg === "string" && isNaN(+arg)) {
        return arg;
    }
    else {
        throw new Error("expected arg was not of type string.");
    }
}
exports.assertString = assertString;
function assertNumber(arg) {
    if (!isNaN(+arg)) {
        return +arg;
    }
    else {
        throw new Error("expected arg was not of type number.");
    }
}
exports.assertNumber = assertNumber;
function assertNumberOptional(arg) {
    if (arg === undefined)
        return arg;
    return assertNumber(arg);
}
exports.assertNumberOptional = assertNumberOptional;
function assertStringOptional(arg) {
    if (arg === undefined)
        return arg;
    return assertString(arg);
}
exports.assertStringOptional = assertStringOptional;
