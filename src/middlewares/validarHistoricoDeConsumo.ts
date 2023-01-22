import { Request, Response, NextFunction } from 'express';
import Cliente from '../interfaces/Cliente';

const NumeroDoDocumento = (request: Request<Cliente>, response: Response, next: NextFunction) => {
  const { historicoDeConsumo } = request.body;

  // Verifica se historico é ou não um array
  const historicoDeConsumoEhUmArray = Array.isArray(historicoDeConsumo);
  if (!historicoDeConsumoEhUmArray) {
    return response.status(400).json({
      message: 'O histórico de consumo deve ser um array',
    });
  }

  // Verifica se é um array composto apernas por numeros inteiros
  // every => verifica se todos os elementos do array passam no teste
  // Number.isInteger => verifica se o elemento é um numero inteiro


  const todosOsElementosSaoNumerosInteiros = historicoDeConsumo.every(Number.isInteger);
  if (!todosOsElementosSaoNumerosInteiros) {
    return response.status(400).json({
      message: 'O histórico de consumo deve ser composto apenas por números inteiros',
    });
  }


  // Verifica se o array mais de 12 elementos ou menos de 3 elementos
  const quantidadeDeElementosValida = historicoDeConsumo.length >= 3 && historicoDeConsumo.length <= 12;
  if (!quantidadeDeElementosValida) {
    return response.status(400).json({
      message: 'O histórico de consumo deve conter entre 3 e 12 elementos',
    });
  }
 
  // Verifica se o array possui elementos < 0 ou > 9999
  const todosOsElementosEstaoEntreZeroE9999 = historicoDeConsumo.every((elemento) => elemento >= 0 && elemento <= 9999);
  if (!todosOsElementosEstaoEntreZeroE9999) {
    return response.status(400).json({
      message: 'O histórico de consumo deve conter apenas números entre 0 e 9999',
    });
  }

 
  next();
};

export default NumeroDoDocumento;