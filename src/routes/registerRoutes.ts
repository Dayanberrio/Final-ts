import { Router } from 'express';
import { register, login } from '../controllers/registerController';

const registerRoutes = Router();

registerRoutes.post('/register', register);
registerRoutes.post('/login', login);

export default registerRoutes;
