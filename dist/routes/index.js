"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-async-errors");
var users_routes_1 = __importDefault(require("./users.routes"));
var sessions_routes_1 = __importDefault(require("./sessions.routes"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var routes = express_1.Router();
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use(function (err, req, res, _) {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});
exports.default = routes;
