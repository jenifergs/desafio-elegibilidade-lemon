import { Request, Response, NextFunction } from 'express';
import Cliente from '../interfaces/Cliente';

const ModalidadeTarifaria = (request: Request<Cliente>, response: Response, next: NextFunction) => {
  const { modalidadeTarifaria } = request.body;
  const modalidadesTarifaria = [
    'azul', 'branca', 'verde', 'convencional'
  ]

  if ( !modalidadesTarifaria.includes(modalidadeTarifaria)) {
    return response.status(400).json({ error: 'Modalidade tarifaria inválida' });
  }
  next();
};

export default ModalidadeTarifaria;