const { Router } = require('express');
const controladorReceita = require('./receitas.Controladores');
const auth = require('../../config/auth');




const routes = new Router();

routes.post('/pagarParcela',auth,controladorReceita.pagarParcela)

routes.post('/cadastrar/:id_instituicao',auth,controladorReceita.cadastrarReceita);
routes.get('/todas/:id_instituicao',auth,controladorReceita.buscarReceitas);
routes.get('/parcelasPorReceita/:id_instituicao/:id_receita',auth,controladorReceita.buscarParcelasPorReceita)
routes.get('/receitasPorUsuario/:id_instituicao/:id_usuario',auth,controladorReceita.buscarReceitaPorUsuario)
routes.get('/receitaPorID/:id_instituicao/:id_receita',auth,controladorReceita.buscarReceitaPorID)
routes.get('/parcelaPorId/:id_instituicao/:id_parcela',auth,controladorReceita.buscarParcelaPoId)
routes.patch('/atualizarReceita/:id_instituicao/:id_receita',auth,controladorReceita.atualizarReceita)
routes.patch('/atualizarParcela/:id_instituicao/:id_parcela',auth,controladorReceita.atualizarParcela)
//routes.delete('/deletar/:id_instituicao/:id_receita',auth,controladorReceita.deletarReceita);

//======================================================================================================
//routes.get('/atualizarStatusParcelas',auth,controladorReceita.atualizarStatusParcela)

module.exports = routes;