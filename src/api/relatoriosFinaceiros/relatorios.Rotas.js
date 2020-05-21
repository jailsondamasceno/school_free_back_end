const { Router } = require('express')
const auth = require('../../config/auth')
const controladorDespesas = require('./relatorios.Control.Despesas')
const controladorReceitas = require('./relatorios.Control.Receitas')

const routes = new Router()

//Receitas
//--Por Instituição -- //buscarReceitasPorCursoETurma aplica vários filtros
routes.post('/receitasComFiltro/:id_instituicao', auth, controladorReceitas.filtrarReceitas)
routes.get('/receitasCursoTurma/:id_instituicao/:id_curso', auth, controladorReceitas.buscarReceitasPorCursoETurma)
routes.get('/receitasMesValor/:id_instituicao', auth, controladorReceitas.buscarReceitasMesSoValor)
routes.get('/receitasMesValorEmAtraso/:id_instituicao', auth, controladorReceitas.buscarReceitasMesSoValorEmAtraso)
routes.get('/receitasAnoValor/:id_instituicao', auth, controladorReceitas.buscarReceitasAnoSoValor)
routes.get('/receitasAnoValorEmAtraso/:id_instituicao', auth, controladorReceitas.buscarReceitasAnoSoValorEmAtraso)
routes.get('/usuariosInadiplentes/:id_instituicao', auth, controladorReceitas.buscarUsuariosComParcelasEmAtraso)


//--Por Escola --
routes.get('/receitasComFiltro/:id_instituicao/:id_escola', auth, controladorReceitas.filtrarReceitasES)
routes.get('/receitasCursoTurma/:id_instituicao/:id_escola/:id_curso', auth, controladorReceitas.buscarReceitasPorCursoETurmaES)
routes.get('/receitasMesValor/:id_instituicao/:id_escola', auth, controladorReceitas.buscarReceitasMesSoValorES)
routes.get('/receitasMesValorEmAtraso/:id_instituicao/:id_escola', auth, controladorReceitas.buscarReceitasMesSoValorEmAtrasoES)
routes.get('/receitasAnoValor/:id_instituicao/:id_escola', auth, controladorReceitas.buscarReceitasAnoSoValorES)
routes.get('/receitasAnoValorEmAtraso/:id_instituicao/:id_escola', auth, controladorReceitas.buscarReceitasAnoSoValorEmAtrasoES)
routes.get('/usuariosInadiplentes/:id_instituicao/:id_escola', auth, controladorReceitas.buscarUsuariosComParcelasEmAtrasoES)





//=====================================DESPESAS===================================================================



// Despesas--------------------------------------------------------------------------------------------------
//---Por instituição---
routes.post('/despesasComFiltro/:id_instituicao', auth, controladorDespesas.buscarDerspesasComFiltro)
routes.get('/despesasMensais/:id_instituicao', auth, controladorDespesas.despesasMensais)
routes.get('/despesasMensaisValor/:id_instituicao', auth, controladorDespesas.despesasMensaisValorTotal)
routes.get('/despesasAnoValor/:id_instituicao', auth, controladorDespesas.despesasAnoValorTotal)


//----Por Por escola----
routes.get('/despesasComFiltro/:id_instituicao/:id_escola', auth, controladorDespesas.despesasPorCategoriaEscola)
routes.get('/despesasMensais/:id_instituicao/:id_escola', auth, controladorDespesas.despesasMensaisEscola)
routes.get('/despesasMensaisValor/:id_instituicao/:id_escola', auth, controladorDespesas.despesasMensaisValorTotalEscola)
routes.get('/despesasAnoValor/:id_instituicao/:id_escola', auth, controladorDespesas.despesasAnoValorTotalEscola)



module.exports = routes