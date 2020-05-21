const { Router } = require('express');
const controladorCurso = require('./curso.Controladores');
const auth = require('../../config/auth')



const routes = new Router();

routes.get('/tiposDuracao',auth,controladorCurso.tiposDuracao);

routes.post('/cadastrar/:id_instituicao',auth,controladorCurso.cadastrarCurso);
routes.post('/cadastrarDiretor/:id_instituicao/:id_escola',auth,controladorCurso.cadastrarCurso);
routes.get('/todos/:id_instituicao',auth,controladorCurso.buscarCursosInstituicao);
routes.get('/cursosDaEscola/:id_instituicao/:id_escola',auth,controladorCurso.buscarCursosEscola);
routes.get('/cursoPorId/:id_instituicao/:id_curso',auth,controladorCurso.buscarCursoPorID)
routes.patch('/atualizar/:id_instituicao/:id_curso',auth,controladorCurso.atualizarCurso)
routes.delete('/atualizar/:id_instituicao/:id_curso',auth,controladorCurso.deletarCurso)

module.exports = routes;