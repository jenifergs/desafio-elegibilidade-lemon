export interface ResultadoDaProposta {
  elegivel: boolean
}

export interface ResultadoPropostaAceita extends ResultadoDaProposta {
  economiaAnualDeCO2: number
}

export interface ResultadoPropostaRejeitada extends ResultadoDaProposta {
  razoesInelegibilidade: string[]
}
