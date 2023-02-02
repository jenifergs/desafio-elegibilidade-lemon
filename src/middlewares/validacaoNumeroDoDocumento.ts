import { type Request, type Response, type NextFunction } from 'express'
import type Cliente from '../interfaces/Cliente'
import { cpf, cnpj } from 'cpf-cnpj-validator'

const ValidacaoNumeroDoDocumento = (request: Request<Cliente>, response: Response, next: NextFunction): any => {
  const { numeroDoDocumento } = request.body

  cpf.isValid(numeroDoDocumento)
  cnpj.isValid(numeroDoDocumento)

  // Se o numero do docuemnto não for um cpf ou não for um cnpj
  if (!(cpf.isValid(numeroDoDocumento) || cnpj.isValid(numeroDoDocumento))) {
    return response.status(400).json({ error: 'Número do documento inválido' }) // lança o erro
  }
  next()
}

export default ValidacaoNumeroDoDocumento
