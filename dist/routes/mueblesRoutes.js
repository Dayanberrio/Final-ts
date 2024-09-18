"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mueblesController_1 = require("../controllers/mueblesController");
var router = (0, express_1.Router)();
// Ruta para crear un nuevo mueble
router.post('/muebles', mueblesController_1.createMueble);
// Ruta para obtener todos los muebles
router.get('/muebles', mueblesController_1.getMuebles);
// Ruta para obtener un mueble por ID
router.get('/muebles/:id', mueblesController_1.getMuebleById);
// Ruta para actualizar un mueble por ID
router.put('/muebles/:id', mueblesController_1.updateMueble);
// Ruta para eliminar un mueble por ID
router.delete('/muebles/:id', mueblesController_1.deleteMueble);
exports.default = router;
