import Cliente from "../../src/interfaces/Cliente";
import PropostaService from "../../src/service/PropostaService";
import { copiaCom, propostaElegivel, propostaInelegivel } from "../mocks/proposta.mock";

describe('Testando Service', () => {
  let service: PropostaService;
  beforeEach(() => {
    service = new PropostaService();
  });
  it('calcula consumo medio proposta elegivel', async () => {
    const consumoMedio = service.calculaConsumeMedio(propostaElegivel);
    expect(consumoMedio).toBe(5509.166666666667);
  });

  it('calcula consumo medio proposta inelegivel', async () => {
    const consumoMedio = service.calculaConsumeMedio(propostaInelegivel);
    expect(consumoMedio).toBe(4547.666666666667);
  });

  // checa razoes de inegebilidade
  it('checa se array de razoes de inegebilidade é vazio caso proposta seja elegivel', async () => {
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(propostaElegivel, service.calculaConsumeMedio(propostaElegivel));
    expect(razoesInelegibilidade).toEqual([]);
  }
  );

  it('checa se array de razoes de inegebilidade não é vazio caso proposta seja inelegivel', async () => {
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(propostaInelegivel, service.calculaConsumeMedio(propostaInelegivel));
    expect(razoesInelegibilidade).not.toEqual([]);
  }
  );
  // testando razoes de inegebilidade
  it('checa razão de inegebilidade: Classe de consumo', async () => {
    const clienteInelegivel1 = copiaCom(propostaElegivel, { classeDeConsumo: 'rural' });
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(clienteInelegivel1, service.calculaConsumeMedio(clienteInelegivel1));
    expect(razoesInelegibilidade).toEqual(['Classe de consumo não aceita']);
  }
  );

  it('checa razão de inegebilidade: Modalidade tarifaria', async () => {
    const clienteInelegivel2 = copiaCom(propostaElegivel, { modalidadeTarifaria: 'azul' });
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(clienteInelegivel2, service.calculaConsumeMedio(clienteInelegivel2));
    expect(razoesInelegibilidade).toEqual(['Modalidade tarifaria não aceita']);
  }
  );

  it('checa razão de inegebilidade: Tipo de conexão- monofasica', async () => {
    const clienteInelegivel3 = copiaCom(propostaElegivel, { tipoDeConexao: 'monofasico', historicoDeConsumo: [0, 0, 30] });
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(clienteInelegivel3, service.calculaConsumeMedio(clienteInelegivel3));
    
    expect(razoesInelegibilidade).toEqual(['Consumo muito baixo para tipo de conexão']);
  }
  );

  it('checa razão de inegebilidade: Tipo de conexão - bifasica', async () => {
    const clienteInelegivel3 = copiaCom(propostaElegivel, { tipoDeConexao: 'bifasico', historicoDeConsumo: [0, 0, 30] });
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(clienteInelegivel3, service.calculaConsumeMedio(clienteInelegivel3));
    
    expect(razoesInelegibilidade).toEqual(['Consumo muito baixo para tipo de conexão']);
  }
  );

  it('checa razão de inegebilidade: Tipo de conexão - trifasica', async () => {
    const clienteInelegivel3 = copiaCom(propostaElegivel, { tipoDeConexao: 'trifasico', historicoDeConsumo: [0, 0, 30] });
    const razoesInelegibilidade = service.consultaRazoesInegebilidade(clienteInelegivel3, service.calculaConsumeMedio(clienteInelegivel3));
    
    expect(razoesInelegibilidade).toEqual(['Consumo muito baixo para tipo de conexão']);
  }
  );

  // testando novaProposta
  it('checa se proposta elegivel é aceita', async () => {
    const resultado = await service.novaProposta(propostaElegivel);
    expect(resultado).toEqual({
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
   });
  }
  );

  it('checa se proposta inelegivel é rejeitada', async () => {
    const resultado = await service.novaProposta(propostaInelegivel);
    expect(resultado).toEqual({
      elegivel: false,
      razoesInelegibilidade: [
        "Classe de consumo não aceita",
        "Modalidade tarifaria não aceita"
      ]
    });
  }
  );

});