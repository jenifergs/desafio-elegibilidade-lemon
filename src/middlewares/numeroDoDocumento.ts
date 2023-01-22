import { Request, Response, NextFunction } from 'express';
import Cliente from '../interfaces/Cliente';

const NumeroDoDocumento = (request: Request<Cliente>, response: Response, next: NextFunction) => {
  const { numeroDoDocumento } = request.body;
 const regexCPF = new RegExp('^\\d{11}$');
 const regexCNPJ = new RegExp('^\\d{14}$');

 // Se o numero do docuemnto não for um cpf ou não for um cnpj
 if ( !(regexCPF.test(numeroDoDocumento) || regexCNPJ.test(numeroDoDocumento))) {
   return response.status(400).json({ error: 'Número do documento inválido' }) // lança o erro
 }
  next();
};

export default NumeroDoDocumento;