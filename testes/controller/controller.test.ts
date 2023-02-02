import PropostaService from "../../src/service/PropostaService"
import PropostaController from "../../src/controller/PropostaController"
import { propostaElegivel, propostaInelegivel } from "../mocks/proposta.mock";
import { Request, Response } from "express";
import Cliente from "../../src/interfaces/Cliente";
import { respostaPropostaAceita, respostaPropostaRecusada } from "../mocks/respostas.mock";


describe('Testando controller', () => {
  let controller: PropostaController;
  let service: PropostaService;
  let res: Response;
  beforeEach( async () => {
      res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    service = new PropostaService();
    controller = new PropostaController(service)
  });

  it('Verificando retorno de status 200 caso proposta seja elegivel', async () => {
    const req = {
      body: propostaElegivel
    }
    await controller.novaProposta(req as Request<Cliente>, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(respostaPropostaAceita)
  })

  it('Verificando retorno de status 200 caso proposta seja recusada', async () => {
    const req = {
      body: propostaInelegivel
    }
    await controller.novaProposta(req as Request<Cliente>, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(respostaPropostaRecusada)
  })

  it('Verificando retorno de status 400, caso proposta seja elegivel porém aconteça um erro desconhecido no service', async () => {
    const req = {
      body: propostaElegivel
    }
    service.novaProposta = jest.fn().mockImplementation(async () => {throw new Error('Erro inesperado')})
    await controller.novaProposta(req as Request<Cliente>, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({error: 'Erro inesperado' })
  })

  it('Verificando se um controller instanciado sem passar o service é uma instancia de proposta controller', async () => {
  const controller2 = new PropostaController();
    expect(controller2).toBeInstanceOf(PropostaController)
  })

})