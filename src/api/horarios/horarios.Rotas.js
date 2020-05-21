const { Router } = require('express');
const controladorHorarios = require('./horarios.Controladores');
const auth = require('../../config/auth')




const routes = new Router();

routes.post('/cadastrar/:id_instituicao',auth,controladorHorarios.cadastrarHorario);
routes.get('/horariosPorTurma/:id_instituicao/:id_turma',auth,controladorHorarios.horariosPorTurma);
routes.get('/horariosPorProf/:id_instituicao/:id_professor',auth,controladorHorarios.horariosPorProf);
routes.get('/horariosDaTurmaPorDia/:id_instituicao/:id_turma/:dia',auth,controladorHorarios.horariosPorDiaDaSemana);
routes.get('/horarioPorId/:id_instituicao/:id_horario',auth,controladorHorarios.buscarHorarioPorID)
routes.patch('/atualizar/:id_instituicao/:id_horario',auth,controladorHorarios.atualizarHorario)
routes.delete('/deletar/:id_instituicao/:id_horario',auth,controladorHorarios.deletarHorario)

module.exports = routes;