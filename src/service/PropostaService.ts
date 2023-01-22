import Cliente from "../interfaces/Cliente";

export default class PropostaService {

  constructor() {
  }

  novaProposta = async (proposta: Cliente) => {
    // adicionar regras abaixo:
    // 1. Verificar se a classe de consumo
    // 2. Verificar a modalidade tarifaria


    const classesDeConsumoElegiveis =  [
      'residencial',
      'industrial',
      'comercial',
    ]

    const modalidadesTarifariasElegiveis = [
      'convencional',
      'branca',
    ]

    const consumoMedio = this.calculaConsumeMedio(proposta);

    const razoesInelegibilidade = [];


    // se a classe de consumo do cliente não for uma das aceitas adicionar ao array
    // indicando as razoes de inelegibilidade da proposta
    if (!classesDeConsumoElegiveis.includes(proposta.classeDeConsumo)) {
      razoesInelegibilidade.push('Classe de consumo não aceita');
    }

    // se a modalidade tarifaria do cliente não for uma das aceitas adicionar ao array
    // indicando as razoes de inelegibilidade da proposta
    if (!modalidadesTarifariasElegiveis.includes(proposta.modalidadeTarifaria)) {
      razoesInelegibilidade.push('Modalidade tarifaria não aceita');
    }

    // se o cliente tiver o tipo de conexao monofasica entao consumo medio nao pode ser menor que 400
    // se o cliente tiver o tipo de conexao bifasica entao consumo medio nao pode ser menor que 500 
    // se o cliente tiver o tipo de conexao trifasica entao consumo medio nao pode ser menor que 750
    if (proposta.tipoDeConexao === 'monofasica' && consumoMedio < 400 || proposta.tipoDeConexao === 'bifasica' && consumoMedio < 500 || proposta.tipoDeConexao === 'trifasica' && consumoMedio < 750) {
      razoesInelegibilidade.push('Consumo muito baixo para tipo de conexão'); // adicionar ao array indicando as razoes de inelegibilidade da proposta
    }


    if(razoesInelegibilidade.length > 0) {
      return {
        elegivel: false,
        razoesInelegibilidade,
        
      }
    } 


    //- Para calcular a projeção da **economia anual** de CO2, considere que para serem gerados 1000 kWh no Brasil são emitidos em média 84kg de CO2.

    const consumoAnual = consumoMedio * 12; // o consumo anual é o consumo médio multiplicado por 12
    const economiaAnualDeCO2 = consumoAnual * (84 / 1000); // a economia anual de CO2 é o consumo anual multiplicado por 84
  


    return {
      elegivel: true,
      economiaAnualDeCO2: Number(economiaAnualDeCO2.toFixed(2)),
    }




  };

  private calculaConsumeMedio = (proposta: Cliente) => {

    // soma todos os consumos e divide por 12
    // retorna o valor do consumo médio
    const consumo = proposta.historicoDeConsumo.reduce((total, consumo) => {
      return total + consumo;
    }, 0)

    return consumo / 12;
  }
}