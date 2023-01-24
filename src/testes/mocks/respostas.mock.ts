const respostaPropostaAceita = {
    resultado: {
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    }
}

const respostaPropostaRecusada = {
  resultado: {
    elegivel: false,
    razoesInelegibilidade: [
      "Classe de consumo não aceita",
      "Modalidade tarifaria não aceita"
    ]
  }
}

export {respostaPropostaAceita, respostaPropostaRecusada}