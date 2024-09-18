import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db';  // Asegúrate de que la ruta a tu módulo de conexión sea correcta
import { RowDataPacket } from 'mysql2';

// Interfaz para el tipo de usuario
interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

// Función para registrar un nuevo usuario
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Verifica si el nombre de usuario ya existe
    const [existingUsers] = await db.query<RowDataPacket[]>('SELECT * FROM register WHERE username = ?', [username]);

    // Convertir a User[]
    const users: User[] = existingUsers as User[];

    if (users.length) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en la base de datos
    const [result] = await db.query('INSERT INTO register (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    // Obtiene el ID del nuevo usuario
    const userId = (result as any).insertId;

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error registering user:', error);  // Añadido para debug
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Función para iniciar sesión
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Consulta el usuario por nombre de usuario
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM register WHERE username = ?', [username]);

    // Convertir a User[]
    const users: User[] = rows as User[];

    if (!users.length) return res.status(400).json({ message: 'Invalid username or password' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: 'Invalid username or password' });

    // Guarda el ID del usuario en la sesión
    req.session.userId = user.id;  
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);  // Añadido para debug
    res.status(500).json({ message: 'Error logging in' });
  }
};
