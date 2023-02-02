import { AddressInfo } from "node:net";
import request from "supertest";
import { app, App } from "../src/App";
import { propostaElegivel, propostaInelegivel, copiaCom, propostaElegivel2 } from "../testes/mocks/proposta.mock";
import { respostaPropostaAceita, respostaPropostaRecusada, respostaPropostaAceita2} from "../testes/mocks/respostas.mock";

describe('Testes de integração', () => {
it('Verificando se o endpoint /proposta retorna status 200', async () => {
  const response = await request(app).post('/proposta').send(propostaElegivel)
  expect(response.status).toBe(200);
  expect(response.body).toEqual(respostaPropostaAceita);
})

it('Verificando se o endpoint /proposta retorna status 200', async () => {
  const response = await request(app).post('/proposta').send(propostaElegivel2)
  expect(response.status).toBe(200);
  expect(response.body).toEqual(respostaPropostaAceita2);
})

it('Verificando se o endpoint /proposta retorna status 200', async () => {
  const response = await request(app).post('/proposta').send(propostaInelegivel)
  expect(response.status).toBe(200);
  expect(response.body).toEqual(respostaPropostaRecusada);
})

it('Verificando se o endpoint /proposta retorna status 400 caso algum erro seja detectado através de middlewares', async () => {
  const response = await request(app).post('/proposta').send(copiaCom(propostaElegivel, {numeroDoDocumento: ''}))
  expect(response.status).toBe(400);
  expect(response.body).toEqual({ error: 'Número do documento inválido' });
})

// verificando metodo start do APp
it('Verificando se o metodo start do App retorna um servidor', async () => {
  const app = new App();
  const server = await app.start(3000);
  expect(server).toBeDefined();
  server.close();
})

it('verificando em qual porta esta rodando o servidor', async () => {
  const app = new App();
  const server = await app.start(3000);
  const adress = server.address() as AddressInfo;
  expect(adress.port).toBe(3000);
  server.close();
})

})