"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var registerController_1 = require("../controllers/registerController");
var registerRoutes = (0, express_1.Router)();
registerRoutes.post('/register', registerController_1.register);
registerRoutes.post('/login', registerController_1.login);
exports.default = registerRoutes;
