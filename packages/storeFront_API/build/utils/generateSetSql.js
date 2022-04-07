"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSetSql = void 0;
var generateSetSql = function (args) {
    var keyEqualsValueStatements = args.map(function (_a, idx) {
        var key = _a[0];
        return "".concat(key, " = $").concat(idx + 1);
    });
    return {
        setSqlStatement: "SET ".concat(keyEqualsValueStatements),
        values: args.map(function (_a) {
            var val = _a[1];
            return val;
        }),
    };
};
exports.generateSetSql = generateSetSql;
