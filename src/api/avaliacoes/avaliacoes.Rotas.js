const { Router } = require('express');
const controladorAvaliacoes = require('./avaliacoes.Controladores');
const auth = require('../../config/auth')




const routes = new Router();

routes.post('/cadastrar/:id_instituicao',auth,controladorAvaliacoes.cadastrarAvaliacao);
routes.get('/avaliacoesPorAluno/:id_instituicao/:id_aluno',auth,controladorAvaliacoes.buscarAvaliacoesPorAluno);
routes.get('/avaliacaoPorId/:id_instituicao/:id_avaliacao',auth,controladorAvaliacoes.buscarAvaliacaoPorID)
routes.patch('/atualizar/:id_instituicao/:id_avaliacao',auth,controladorAvaliacoes.atualizarAvaliacao)
routes.delete('/deletar/:id_instituicao/:id_avaliacao',auth,controladorAvaliacoes.deletarAvaliacao)

module.exports = routes;