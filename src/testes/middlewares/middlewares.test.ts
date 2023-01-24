import { Request, Response } from "express";
import Cliente from "../../interfaces/Cliente";
import ValidacaoModalidadeTarifaria from "../../middlewares/validacaoModalidadeTarifaria";
import ValidacaoNumeroDoDocumento from "../../middlewares/validacaoNumeroDoDocumento";
import ValidacaoTiposDeConexao from "../../middlewares/validacaoTiposDeConexao";
import ValidacaoClasseConsumo from "../../middlewares/validacaoClasseConsumo";
import ValidacaoHistoricoDeConsumo from "../../middlewares/validacaoHistoricoDeConsumo";

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

    ValidacaoModalidadeTarifaria(req as Request<Cliente>, res as unknown as Response, next);

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

    ValidacaoModalidadeTarifaria(req as Request<Cliente>, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
  })

  it('Middleware - NUMERO DO DOCUMENTO(CPF) : deve retornar erro quando o numero do documento for inválido', () => {
    const req = {
      body: {
        numeroDoDocumento: '123456789'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoNumeroDoDocumento(req as Request<Cliente>, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Número do documento inválido' });
  })

  it('Middleware - NUMERO DO DOCUMENTO(CPF) : deve chamar o next quando o numero do documento for válido', () => {
    const req = {
      body: {
        numeroDoDocumento: '12345678901'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoNumeroDoDocumento(req as Request<Cliente>, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
  })

  it('Middleware - NUMERO DO DOCUMENTO(CNPJ) : deve retornar erro quando o numero do documento for inválido', () => {
    const req = {
      body: {
        numeroDoDocumento: '1234567890123'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoNumeroDoDocumento(req as Request<Cliente>, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Número do documento inválido' });
  })

  //TESTAR TIPOS DE CONEXAO
  it('Middleware - TIPOS DE CONEXAO : deve retornar erro quando o tipo de conexão for inválido', () => {
    const req = {
      body: {
        tiposDeConexao: 'invalida'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoTiposDeConexao(req as Request<Cliente>, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Tipo de conexao inválida' });
  })

  it('Middleware - TIPOS DE CONEXAO : deve chamar o next quando o tipo de conexão for válido', () => {
    const req = {
      body: {
        tipoDeConexao: 'monofasico'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoTiposDeConexao(req as Request<Cliente>, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
  })

  //TESTAR VALIDACAO CLASSE CONSUMO
  it('Middleware - VALIDACAO CLASSE CONSUMO : deve retornar erro quando a classe de consumo for inválida', () => {
    const req = {
      body: {
        classeConsumo: 'invalida'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoClasseConsumo(req as Request<Cliente>, res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Classe de consumo inválida' });
  })

  it('Middleware - VALIDACAO CLASSE CONSUMO : deve chamar o next quando a classe de consumo for válida', () => {
    const req = {
      body: {
        classeDeConsumo: 'residencial'
      }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();

    ValidacaoClasseConsumo(req as Request<Cliente>, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
  })

//  validarHistoricoDeConsumo
it('Middleware - VALIDACAO HISTORICO DE CONSUMO : deve chamar o next quando a classe de consumo for válida', () => {
  const req = {
    body: {
      historicoDeConsumo: [1, 2, 3, 4, 5 ,6, 7, 8, 9, 10, 11, 12]
    }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  const next = jest.fn();

  ValidacaoHistoricoDeConsumo(req as Request<Cliente>, res as unknown as Response, next);

  expect(next).toHaveBeenCalled();
})

it('Middleware - VALIDACAO HISTORICO DE CONSUMO : Retorna erro caso histórico não seja um array ', () => {
  const req = {
    body: {
      historicoDeConsumo: {}
    }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  const next = jest.fn();

  ValidacaoHistoricoDeConsumo(req as Request<Cliente>, res as unknown as Response, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'O histórico de consumo deve ser um array' });
})

it('Middleware - VALIDACAO HISTORICO DE CONSUMO : Retorna erro caso algum número não seja um inteiro ', () => {
  const req = {
    body: {
      historicoDeConsumo: [1, 2, 2.5]
    }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  const next = jest.fn();

  ValidacaoHistoricoDeConsumo(req as Request<Cliente>, res as unknown as Response, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'O histórico de consumo deve ser composto apenas por números inteiros' });
})

it('Middleware - VALIDACAO HISTORICO DE CONSUMO : Retorna erro caso array seja menor que 3 ou maior que 12 ', () => {
  const req = {
    body: {
      historicoDeConsumo: [1, 2]
    }
  }

  const req1 = {
    body: {
      historicoDeConsumo: [1, 2, 3, 4, 5 ,6, 7, 8, 9, 10, 11, 12, 13]
    }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  const res1 = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  const next = jest.fn();

  ValidacaoHistoricoDeConsumo(req as Request<Cliente>, res as unknown as Response, next);
  ValidacaoHistoricoDeConsumo(req1 as Request<Cliente>, res1 as unknown as Response, next);


  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'O histórico de consumo deve conter entre 3 e 12 elementos' });

  expect(res1.status).toHaveBeenCalledWith(400);
  expect(res1.json).toHaveBeenCalledWith({ error: 'O histórico de consumo deve conter entre 3 e 12 elementos' });
})

it('Middleware - VALIDACAO HISTORICO DE CONSUMO : Retorna erro caso algum elemento do array seja menor que 0 ou maior que 9999 ', () => {
  const req = {
    body: {
      historicoDeConsumo: [-1, 2, 3]
    }
  }

  const req1 = {
    body: {
      historicoDeConsumo: [1, 2, 3,100003]
    }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  const res1 = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  const next = jest.fn();

  ValidacaoHistoricoDeConsumo(req as Request<Cliente>, res as unknown as Response, next);
  ValidacaoHistoricoDeConsumo(req1 as Request<Cliente>, res1 as unknown as Response, next);


  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'O histórico de consumo deve conter apenas números entre 0 e 9999' });

  expect(res1.status).toHaveBeenCalledWith(400);
  expect(res1.json).toHaveBeenCalledWith({ error: 'O histórico de consumo deve conter apenas números entre 0 e 9999' });
})

})

// 'O histórico de consumo deve conter apenas números entre 0 e 9999'