import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next(); // El usuario está autenticado, continuar con la solicitud
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
