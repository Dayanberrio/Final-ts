import { Router } from 'express';
import {
  createMueble,
  getMuebles,
  getMuebleById,
  updateMueble,
  deleteMueble
} from '../controllers/mueblesController';

const router = Router();

// Ruta para crear un nuevo mueble
router.post('/muebles', createMueble);

// Ruta para obtener todos los muebles
router.get('/muebles', getMuebles);

// Ruta para obtener un mueble por ID
router.get('/muebles/:id', getMuebleById);

// Ruta para actualizar un mueble por ID
router.put('/muebles/:id', updateMueble);

// Ruta para eliminar un mueble por ID
router.delete('/muebles/:id', deleteMueble);

export default router;
