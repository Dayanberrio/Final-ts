import express from 'express';
import session from 'express-session';
import mysql from 'mysql2/promise';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes';
import mueblesRoutes from './routes/mueblesRoutes';
import { isAuthenticated } from './middleware/auth';

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4321',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Configuración de la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
});

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', // Asegúrate de que esta clave sea segura
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(), // Usamos el almacenamiento en memoria por defecto
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Asegúrate de que sea `true` en producción
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
  },
}));

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', registerRoutes);
app.use('/api',  mueblesRoutes);

export default app;
