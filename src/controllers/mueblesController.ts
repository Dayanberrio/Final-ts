import { Request, Response } from 'express';
import db from '../db'; // Ajusta la importación según la ubicación de tu módulo de conexión a MySQL
import { RowDataPacket } from 'mysql2';

// Interfaz para el tipo de mueble
interface Mueble extends RowDataPacket {
  id: number;
  puestocantidad: number;
  tipoServicio: string;
  tipoMaterial: string;
}

// Crear un nuevo mueble
export const createMueble = async (req: Request, res: Response) => {
  const { puestocantidad, tipoServicio, tipoMaterial } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO muebles (puestocantidad, tipoServicio, tipoMaterial) VALUES (?, ?, ?)',
      [puestocantidad, tipoServicio, tipoMaterial]
    );
    res.status(201).json({ message: 'Mueble created successfully', id: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating mueble' });
  }
};

// Obtener todos los muebles
export const getMuebles = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM muebles');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching muebles' });
  }
};

// Obtener un mueble por ID
export const getMuebleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM muebles WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Mueble not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mueble' });
  }
};

// Actualizar un mueble por ID
export const updateMueble = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { puestocantidad, tipoServicio, tipoMaterial } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE muebles SET puestocantidad = ?, tipoServicio = ?, tipoMaterial = ? WHERE id = ?',
      [puestocantidad, tipoServicio, tipoMaterial, id]
    );
    if ((result as any).affectedRows === 0) return res.status(404).json({ message: 'Mueble not found' });
    res.json({ message: 'Mueble updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating mueble' });
  }
};

// Eliminar un mueble por ID
export const deleteMueble = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM muebles WHERE id = ?', [id]);
    if ((result as any).affectedRows === 0) return res.status(404).json({ message: 'Mueble not found' });
    res.json({ message: 'Mueble deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mueble' });
  }
};
