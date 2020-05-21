const { Router } = require('express');
const controladorPlano = require('./plano.controladores')
const auth = require('../../config/auth')


const routes = new Router();


routes.post('/contratarPlano/:id_instituicao',auth,controladorPlano.contratarPlano)

routes.post('/cadastrar',auth,controladorPlano.criarPlano);
routes.get('/todos',auth,controladorPlano.buscarPlanos);
routes.get('/planoPorId/:id',auth,controladorPlano.buscarPlanoPorID);
routes.patch('/atualizar/:id',auth,controladorPlano.atualizarPlano);
routes.patch('/ativar/:id',auth,controladorPlano.ativarPlano);
routes.patch('/inativar/:id',auth,controladorPlano.inativarPlano);
routes.delete('/deletar/:id',auth,controladorPlano.deletarPlano);



module.exports = routes;