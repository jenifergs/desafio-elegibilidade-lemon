import Cliente from "../../interfaces/Cliente";

const propostaElegivel: Cliente = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [
    3878, // mes atual
    9760, // mes anterior
    5976, // 2 meses atras
    2797, // 3 meses atras
    2481, // 4 meses atras
    5731, // 5 meses atras
    7538, // 6 meses atras
    4392, // 7 meses atras
    7859, // 8 meses atras
    4160, // 9 meses atras
    6941, // 10 meses atras
    4597  // 11 meses atras
  ]
}

const propostaInelegivel: Cliente ={
    numeroDoDocumento: "14041737706",
    tipoDeConexao: "bifasico",
    classeDeConsumo: "rural",
    modalidadeTarifaria: "verde",
    historicoDeConsumo: [
      3878, // mes atual
      9760, // mes anterior
      5976, // 2 meses atras
      2797, // 3 meses atras
      2481, // 4 meses atras
      5731, // 5 meses atras
      7538, // 6 meses atras
      4392, // 7 meses atras
      7859, // 8 meses atras
      4160, // 9 meses atras
    ]
  };

  const copiaCom = (cliente: Cliente, dados: Partial<Cliente>): Cliente => {
    return Object.assign({}, cliente, dados);
  };


export { propostaElegivel, propostaInelegivel, copiaCom};