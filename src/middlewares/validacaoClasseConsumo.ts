
import { Request, Response, NextFunction } from 'express';
import Cliente from '../interfaces/Cliente';

const validacaoClasseConsumo = (request: Request<Cliente>, response: Response, next: NextFunction) => {
  const { classeDeConsumo } = request.body;
  const classesDeConsumo = [
    'residencial',
    'industrial',
    'comercial',
    'rural',
    'poderPublico',
  ]

  if ( !classesDeConsumo.includes(classeDeConsumo)) {
    return response.status(400).json({ error: 'Classe de consumo inválida' });
  }
  next();
};

export default validacaoClasseConsumo;