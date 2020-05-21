const { Router } = require('express');
const controladorInstituicao = require('./instituicao.controladores');
const auth = require('../../config/auth')
const {validaAdmin,validaEmpresa,validaCliente} = require('../usuarios/usuario.permissao')





const routes = new Router();

routes.get('/chavesPagamento/:id_instituicao',auth,controladorInstituicao.buscarChavesPagamento)

routes.post('/cadastrar',auth,controladorInstituicao.cadastrarInstituicao);
routes.get('/todas',auth,controladorInstituicao.buscarInstituicoes);
routes.get('/buscarPorCriador/:id_criador',auth,controladorInstituicao.buscarInstituicoesPorIdCriador)
routes.get('/buscarPorId/:id_instituicao',auth,controladorInstituicao.buscarInstituicaoPorID)
routes.patch('/atualizar/:id_instituicao',auth,controladorInstituicao.atualizarInstituicao)
routes.delete('/deletar/:id_instituicao',auth,controladorInstituicao.deletarInstituicao)



module.exports = routes;