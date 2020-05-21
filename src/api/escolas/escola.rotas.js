const { Router } = require('express');
const controladorEscola = require('./escola.Controladores');
const auth = require('../../config/auth')


const routes = new Router();
routes.get('/categorias',auth,controladorEscola.categoriasEscolas);
routes.get('/categoriaPorId/:id_categoria',auth,controladorEscola.categoriasEscolasPorID);

routes.post('/cadastrar/:id_instituicao',auth,controladorEscola.cadastrarEscola);
routes.get('/todasInstituicao/:id_instituicao',auth,controladorEscola.buscarEscolas);
routes.get('/escolaPorId/:id_instituicao/:id_escola',auth,controladorEscola.buscarEscolaPorID)
routes.patch('/atualizar/:id_instituicao/:id_escola',auth,controladorEscola.atualizarEscola)
routes.delete('/deletar/:id_instituicao/:id_escola',auth,controladorEscola.deletarEscola)

module.exports = routes;