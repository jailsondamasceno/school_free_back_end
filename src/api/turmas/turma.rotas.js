const { Router } = require('express');
const controladorTurma = require('./turma.Controladores');
const auth = require('../../config/auth')


const routes = new Router();

routes.get('/turmasAbertasValor/:id_instituicao',auth,controladorTurma.buscarTurmasAbertasInstituicaoSoValor);

routes.post('/cadastrar/:id_instituicao',auth,controladorTurma.cadastrarTurma);
routes.get('/todas/:id_instituicao',auth,controladorTurma.buscarTurmas);
routes.get('/turmasPorCurso/:id_instituicao/:id_curso',auth,controladorTurma.buscarTurmasCurso);
routes.get('/turmasPorCursoEscola/:id_instituicao/:id_escola/:id_curso',auth,controladorTurma.buscarTurmasCursoEscola);
routes.get('/turmasPorEscola/:id_instituicao/:id_escola',auth,controladorTurma.buscarTurmasEscola);
routes.get('/turmaPorId/:id_instituicao/:id_turma',auth,controladorTurma.buscarTurmaPorID)
routes.get('/alunos/:id_instituicao/:id_turma',auth,controladorTurma.alunosPorTurma)
routes.get('/professoresDaTurma/:id_instituicao/:id_turma',auth,controladorTurma.professoresPorTurma)
routes.patch('/atualizar/:id_instituicao/:id_turma',auth,controladorTurma.atualizarTurma)


module.exports = routes;