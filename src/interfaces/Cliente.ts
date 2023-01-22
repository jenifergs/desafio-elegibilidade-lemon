export default interface Cliente {
  numeroDoDocumento: string;
  tipoDeConexao: string,
  classeDeConsumo: string,
  modalidadeTarifaria: string,
  historicoDeConsumo: number[]
}