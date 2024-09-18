"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var isAuthenticated = function (req, res, next) {
    if (req.session.userId) {
        next(); // El usuario está autenticado, continuar con la solicitud
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.isAuthenticated = isAuthenticated;
