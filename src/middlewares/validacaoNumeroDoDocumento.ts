import { type Request, type Response, type NextFunction } from 'express'
import type Cliente from '../interfaces/Cliente'

const ValidacaoNumeroDoDocumento = (request: Request<Cliente>, response: Response, next: NextFunction): any => {
  const { numeroDoDocumento } = request.body
  const regexCPF = /^\d{11}$/
  const regexCNPJ = /^\d{14}$/

  // Se o numero do docuemnto não for um cpf ou não for um cnpj
  if (!(regexCPF.test(numeroDoDocumento) || regexCNPJ.test(numeroDoDocumento))) {
    return response.status(400).json({ error: 'Número do documento inválido' }) // lança o erro
  }
  next()
}

export default ValidacaoNumeroDoDocumento
