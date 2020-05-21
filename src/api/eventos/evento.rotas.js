const { Router } = require('express');
const controladorEvento = require('./evento.controladores')
const auth = require('../../config/auth')

const routes = new Router();

routes.post('/tipos/cadastrar/:id_instituicao',auth,controladorEvento.cadastrarTiposEvento);
routes.get('/buscarTipos/:id_instituicao',auth,controladorEvento.buscarTiposEvento);
routes.patch('/atualizarTipoEvento/:id_instituicao/:id_tipoEvento',auth,controladorEvento.atualizarTipoEvento)
routes.delete('/deletarTipoEvento/:id_instituicao/:id_tipoEvento',auth,controladorEvento.deletarTipoEvento)

routes.post('/cadastrar/:id_instituicao',auth,controladorEvento.cadastrarEvento);

routes.get('/eventosDoMesInstituicao/:id_instituicao',auth,controladorEvento.eventosDoMesI);
routes.get('/eventosDaSemanaInstituicao/:id_instituicao',auth,controladorEvento.eventosDaSemanaI);
routes.get('/eventosDoDiaInstituicao/:id_instituicao',auth,controladorEvento.eventosDoDiaI);

routes.get('/eventosDoMesEscola/:id_instituicao/:id_escola',auth,controladorEvento.eventosDoMesE);
routes.get('/eventosDaSemanaEscola/:id_instituicao/:id_escola',auth,controladorEvento.eventosDaSemanaE);
routes.get('/eventosDoDiaEscola/:id_instituicao/:id_escola',auth,controladorEvento.eventosDoDiaE);

routes.get('/eventoPorId/:id_instituicao/:id_evento',auth,controladorEvento.buscarEventoPorID);
routes.get('/eventosPorEscola/:id_instituicao/:id_escola',auth,controladorEvento.buscarEventosPorEscola);
routes.get('/eventosPorEscola/:id_instituicao/:id_turma',auth,controladorEvento.buscarEventosPorTurma);
routes.patch('/atualizar/:id_instituicao/:id_evento',auth,controladorEvento.atualizarEvento);
routes.delete('/deletar/:id_instituicao/:id_evento',auth,controladorEvento.deletarEvento);



module.exports = routes;