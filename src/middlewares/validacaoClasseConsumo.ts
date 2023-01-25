
import { type Request, type Response, type NextFunction } from 'express'
import type Cliente from '../interfaces/Cliente'

const ValidacaoClasseConsumo = (request: Request<Cliente>, response: Response, next: NextFunction): any => {
  const { classeDeConsumo } = request.body
  const classesDeConsumo = [
    'residencial',
    'industrial',
    'comercial',
    'rural',
    'poderPublico'
  ]

  if (!classesDeConsumo.includes(classeDeConsumo)) {
    return response.status(400).json({ error: 'Classe de consumo inválida' })
  }
  next()
}

export default ValidacaoClasseConsumo
