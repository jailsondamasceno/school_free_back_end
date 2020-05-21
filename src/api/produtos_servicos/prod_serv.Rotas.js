const { Router } = require('express');
const controladorProd_Servico = require('./prod_serv.Controladores');
const auth = require('../../config/auth');




const routes = new Router();

routes.get('/prodServPorEscola/:id_instituicao/:id_escola',auth,controladorProd_Servico.buscarProd_Servicos);

routes.post('/cadastrar/:id_instituicao',auth,controladorProd_Servico.cadastrarProd_Servico);
routes.get('/todosInstituicao/:id_instituicao',auth,controladorProd_Servico.buscarProd_Servicos);
routes.get('/prodServPorId/:id_instituicao/:id_prod_serv',auth,controladorProd_Servico.buscarProd_ServicoPorID)
routes.patch('/atualizar/:id_instituicao/:id_prod_serv',auth,controladorProd_Servico.atualizarProd_Servico)
routes.delete('/deletar/:id_instituicao/:id_prod_serv',auth,controladorProd_Servico.deletarProd_Servico);

module.exports = routes;