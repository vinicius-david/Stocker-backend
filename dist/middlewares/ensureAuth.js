"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var AppError_1 = __importDefault(require("../errors/AppError"));
function ensureAuth(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing.', 403);
    }
    var _a = authHeader.split(' '), token = _a[1];
    var secret = auth_1.default.secret;
    try {
        var decoded = jsonwebtoken_1.verify(token, secret);
        var sub = decoded.sub;
        req.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Invalid JWT token.', 403);
    }
}
exports.default = ensureAuth;
