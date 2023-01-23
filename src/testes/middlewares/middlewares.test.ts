import { Request, Response } from "express";
import Cliente from "../../interfaces/Cliente";
import ModalidadeTarifaria from "../../middlewares/modalidadeTarifaria";

describe('testando middlewares', () => {
  it('Middleware - MODALIDADE TARIFARIA : deve retornar erro quando a modalidade tarifaria for inválida', () => {
    const req = {
      body: {
        modalidadeTarifaria: 'invalida'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ModalidadeTarifaria(req as Request<Cliente>, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Modalidade tarifaria inválida' });
  })

  it('Middleware - MODALIDADE TARIFARIA : deve chamar o next quando a modalidade tarifaria for válida', () => {
    const req = {
      body: {
        modalidadeTarifaria: 'azul'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ModalidadeTarifaria(req as Request<Cliente>, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
  })
})