import modalidadeTarifaria from '../middlewares/modalidadeTarifaria';
import NumeroDoDocumento from '../middlewares/numeroDoDocumento';
import validarHistoricoDeConsumo from '../middlewares/validarHistoricoDeConsumo';
import TiposDeConexao from '../middlewares/tiposDeConexao';
import validacaoClasseConsumo from '../middlewares/validacaoClasseConsumo';
import { Router } from 'express';
import PropostaController from '../controller/PropostaController';



const propostaRouter = Router();
const propostaCliente = new PropostaController();

propostaRouter.post('/proposta', modalidadeTarifaria, NumeroDoDocumento, validarHistoricoDeConsumo, TiposDeConexao, validacaoClasseConsumo, propostaCliente.novaProposta);

export default propostaRouter;