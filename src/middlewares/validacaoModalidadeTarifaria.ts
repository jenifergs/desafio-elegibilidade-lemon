import { type Request, type Response, type NextFunction } from 'express'
import type Cliente from '../interfaces/Cliente'

const ValidacaoModalidadeTarifaria = (request: Request<Cliente>, response: Response, next: NextFunction): any => {
  const { modalidadeTarifaria } = request.body
  const modalidadesTarifaria = [
    'azul', 'branca', 'verde', 'convencional'
  ]

  if (!modalidadesTarifaria.includes(modalidadeTarifaria)) {
    return response.status(400).json({ error: 'Modalidade tarifaria inválida' })
  }
  next()
}

export default ValidacaoModalidadeTarifaria
