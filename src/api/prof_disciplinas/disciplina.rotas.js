const { Router } = require('express');
const controladorDisciplina = require('./disciplina.controladores')
const auth = require('../../config/auth')


const routes = new Router();



routes.post('/cadastrar/:id_instituicao',auth,controladorDisciplina.cadastrarDisciplina);
routes.get('/todasCurso/:id_instituicao/:id_curso',auth,controladorDisciplina.buscarDisciplinasCurso);
routes.get('/disciplinaPorId/:id_instituicao/:id_disciplina',auth,controladorDisciplina.buscarDisciplinaPorID);
routes.get('/disciplinasPorProf/:id_instituicao/:id_professor',auth,controladorDisciplina.buscarDisciplinasPorProf);
routes.get('/profsPorDisciplina/:id_instituicao/:id_disciplina',auth,controladorDisciplina.buscarProfsPorDisciplina);
routes.get('/profsInstituicao/:id_instituicao',auth,controladorDisciplina.professoresInstituicao);
routes.get('/profsEscola/:id_instituicao/:id_escola',auth,controladorDisciplina.professoresEscola);
routes.get('/profsTurma/:id_instituicao/:id_turma',auth,controladorDisciplina.professoresTurma);
routes.patch('/atualizar/:id_instituicao/:id_disciplina',auth,controladorDisciplina.atualizarDisciplina);
routes.delete('/deletar/:id_instituicao/:id_disciplina',auth,controladorDisciplina.deletarDisciplina);

module.exports = routes;