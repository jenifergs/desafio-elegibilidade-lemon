import ValidacaoModalidadeTarifaria from "../middlewares/validacaoModalidadeTarifaria";
import ValidacaoNumeroDoDocumento from "../middlewares/validacaoNumeroDoDocumento";
import ValidacaoTiposDeConexao from "../middlewares/validacaoTiposDeConexao";
import ValidacaoClasseConsumo from "../middlewares/validacaoClasseConsumo";
import ValidacaoHistoricoDeConsumo from "../middlewares/validacaoHistoricoDeConsumo";
import { Router } from 'express';
import PropostaController from '../controller/PropostaController';



const propostaRouter = Router();
const propostaCliente = new PropostaController();

propostaRouter.post('/proposta', ValidacaoModalidadeTarifaria, ValidacaoNumeroDoDocumento, ValidacaoTiposDeConexao, ValidacaoClasseConsumo,
ValidacaoHistoricoDeConsumo, propostaCliente.novaProposta);

export default propostaRouter;