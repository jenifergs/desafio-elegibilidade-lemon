import { Request, Response, NextFunction } from 'express';
import Cliente from '../interfaces/Cliente';

const ValidacaoTiposDeConexao = (request: Request<Cliente>, response: Response, next: NextFunction) => {
  const { tipoDeConexao } = request.body;
  const tiposDeConexao = [
    'monofasico', 'bifasico', 'trifasico'
  ]

  if ( !tiposDeConexao.includes(tipoDeConexao)) {
    console.log("oi");
    return response.status(400).json({ error: 'Tipo de conexao inválida' });

  }
  console.log("oi");
  
  next();
};

export default ValidacaoTiposDeConexao;