import { ResultadoPropostaRejeitada, ResultadoPropostaAceita } from '../interfaces/ResultadoDaProposta'
import type Cliente from '../interfaces/Cliente'

export default class PropostaService {
  public novaProposta = async (proposta: Cliente): Promise<ResultadoPropostaAceita | ResultadoPropostaRejeitada> => {
    // adicionar regras abaixo:
    // 1. Verificar se a classe de consumo
    // 2. Verificar a modalidade tarifaria
    const consumoMedio = this.calculaConsumeMedio(proposta)
    const razoesInelegibilidade = this.consultaRazoesInegebilidade(proposta, consumoMedio)

    if (razoesInelegibilidade.length > 0) {
      return {
        elegivel: false,
        razoesInelegibilidade

      }
    }
    // - Para calcular a projeção da **economia anual** de CO2, considere que para serem gerados 1000 kWh no Brasil são emitidos em média 84kg de CO2.

    const consumoAnual = consumoMedio * 12 // o consumo anual é o consumo médio multiplicado por 12
    const economiaAnualDeCO2 = consumoAnual * (84 / 1000) // a economia anual de CO2 é o consumo anual multiplicado por 84

    return {
      elegivel: true,
      economiaAnualDeCO2: Number(economiaAnualDeCO2.toFixed(2))
    }
  }

  public calculaConsumeMedio = (proposta: Cliente): number => {
    // soma todos os consumos e divide por 12
    // retorna o valor do consumo médio
    const consumo = proposta.historicoDeConsumo.reduce((total, consumo) => {
      return total + consumo
    }, 0)

    return consumo / 12
  }

  public consultaRazoesInegebilidade = (proposta: Cliente, consumoMedio: number): string[] => {
    const razoesInelegibilidade = []

    const classesDeConsumoElegiveis = [
      'residencial',
      'industrial',
      'comercial'
    ]

    const modalidadesTarifariasElegiveis = [
      'convencional',
      'branca'
    ]
    // se a classe de consumo do cliente não for uma das aceitas adicionar ao array
    // indicando as razoes de inelegibilidade da proposta
    if (!classesDeConsumoElegiveis.includes(proposta.classeDeConsumo)) {
      razoesInelegibilidade.push('Classe de consumo não aceita')
    }
    // se a modalidade tarifaria do cliente não for uma das aceitas adicionar ao array
    // indicando as razoes de inelegibilidade da proposta
    if (!modalidadesTarifariasElegiveis.includes(proposta.modalidadeTarifaria)) {
      razoesInelegibilidade.push('Modalidade tarifaria não aceita')
    }
    const consumoInvalido = this.calculoConsumoInvalido(proposta, consumoMedio)
    // se o cliente tiver o tipo de conexao monofasica entao consumo medio nao pode ser menor que 400
    // se o cliente tiver o tipo de conexao bifasica entao consumo medio nao pode ser menor que 500
    // se o cliente tiver o tipo de conexao trifasica entao consumo medio nao pode ser menor que 750

    if (consumoInvalido) {
      razoesInelegibilidade.push('Consumo muito baixo para tipo de conexão') // adicionar ao array indicando as razoes de inelegibilidade da proposta
    }
    return razoesInelegibilidade
  }

  private readonly calculoConsumoInvalido = (proposta: Cliente, consumoMedio: number): boolean => {
    const condicaoMonofasica = proposta.tipoDeConexao === 'monofasico' && consumoMedio < 400
    const condicaoBifasica = proposta.tipoDeConexao === 'bifasico' && consumoMedio < 500
    const condicaoTrifasica = proposta.tipoDeConexao === 'trifasico' && consumoMedio < 750

    return condicaoMonofasica || condicaoBifasica || condicaoTrifasica
  }
}
