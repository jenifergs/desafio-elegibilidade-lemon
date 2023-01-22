import { Request, Response } from 'express';
import PropostaService from '../service/PropostaService';
import Cliente from '../interfaces/Cliente';

export default class PropostaController {
  public service: PropostaService;

  constructor(service?: PropostaService) {
    this.service = service || new PropostaService();
  }

  novaProposta = async (req: Request<Cliente>, res: Response) => {
    const proposta = req.body;

    try {
      const resultado = await this.service.novaProposta(proposta);
      return res.status(200).json({ resultado });
    } catch (error) {
      const errorMapped = error as Error;
      return res.status(400).json({ error: errorMapped.message });
    }
  };


}