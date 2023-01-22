import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import * as YAML from 'yamljs';
import propostaRouter from './routes/proposta.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/', propostaRouter);
  }
// configura o cors para que qualquer front se conecte com o backend
  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json()); // converte request em json
    this.app.use(accessControl); // adiciona middleware global para liberação de cors

    // read swagger file swagger.yml (configurando o site do swagger)
    // const swaggerDocument = YAML.load('./swagger.yaml');
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // rota /api-docs exiba frontend do swagger
  }
// inicia o servidor na porta passada, usada no arquivo server.ts
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
export const { app } = new App();