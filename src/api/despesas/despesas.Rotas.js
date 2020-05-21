const { Router } = require('express');
const controladorDespesa = require('./despesas.Controladores');
const auth = require('../../config/auth');




const routes = new Router();

routes.post('/cadastrar/:id_instituicao',auth,controladorDespesa.cadastrarDespesa);
routes.get('/despesasInstituicao/:id_instituicao',auth,controladorDespesa.buscarDespesas);
routes.get('/despesaPorId/:id_instituicao/:id_despesa',auth,controladorDespesa.buscarDespesaPorID)
routes.patch('/atualizar/:id_instituicao/:id_despesa',auth,controladorDespesa.atualizarDespesa)
//routes.delete('/ca/:id_instituicao/:id_Despesa',auth,controladorDespesa.deletarDespesa);

module.exports = routes;