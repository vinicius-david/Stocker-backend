"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var usersController = new UsersController_1.default();
var usersRouter = express_1.Router();
usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.patch('/stock/', usersController.favorite);
usersRouter.put('/:id', usersController.update);
exports.default = usersRouter;
