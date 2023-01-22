import { Request, Response, NextFunction } from 'express';
import Cliente from '../interfaces/Cliente';

const TiposDeConexao = (request: Request<Cliente>, response: Response, next: NextFunction) => {
  const { tipoDeConexao } = request.body;
  const tiposDeConexao = [
    'monofasico', 'bifasico', 'trifasico'
  ]

  if ( !tiposDeConexao.includes(tipoDeConexao)) {
    return response.status(400).json({ error: 'Tipo de conexao inválida' });
  }
  next();
};

export default TiposDeConexao;