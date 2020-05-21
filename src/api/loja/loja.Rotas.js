const { Router } = require('express');
const controlador_Loja = require('./loja.Controladores');
const auth = require('../../config/auth');




const routes = new Router();
//routes.post('/cadastrar/:id_instituicao',auth,controlador_Loja.cadastrarProd_Servico);
routes.get('/produtosInstituicao/:id_instituicao',auth,controlador_Loja.buscarProd_Servicos);
routes.get('/produtosEscola/:id_instituicao/:id_escola',auth,controlador_Loja.buscarProd_ServicosEscola)
routes.get('/produtoPorId/:id_instituicao/:id_produto',auth,controlador_Loja.buscarProd_ServicoPorID)
routes.patch('/atualizar/:id_instituicao/:id_prod_serv',auth,controlador_Loja.atualizarProd_Servico)
//routes.delete('/deletar/:id_instituicao/:id_prod_serv',auth,controlador_Loja.deletarProd_Servico);

module.exports = routes;