const db = require('../../config/firestore')
const relatorioModelo = require('./relatorios.Model.Receitas')
const relatorioModeloEScola = require('./relatorios.ModeloEscola.Receitas')


//Buscar receitas e aplicando filtros
exports.filtrarReceitas = async (req, res, next) => {
     relatorioModelo.buscarRec(req, res, next)
}

//Buscar receitas por Curso e Turma
exports.buscarReceitasPorCursoETurma = async (req, res, next) => {
     relatorioModelo.buscarReceitasPorCursoETurma(req, res, next)
}

//Buscar receitas mes so valor
exports.buscarReceitasMesSoValor = async (req, res, next) => {
     relatorioModelo.buscarReceitasMesSoValor(req, res, next)
}

//Buscar Receitas do Mês Só valor em atraso
exports.buscarReceitasMesSoValorEmAtraso = async (req, res, next) => {
     relatorioModelo.buscarReceitasMesSoValorEmAtraso(req, res, next)
}

//Buscar receitas ano só valo
exports.buscarReceitasAnoSoValor = async (req, res, next) => {
     relatorioModelo.buscarReceitasAnoSoValor(req, res, next)
}

//Buscar receitas ano so valor em atraso
exports.buscarReceitasAnoSoValorEmAtraso = async (req, res, next) => {
     relatorioModelo.buscarReceitasAnoSoValorEmAtraso(req, res, next)
}

//Buscar todos os usuários com parcelas  EM ATRASO  escolhendo mês e ano
exports.buscarUsuariosComParcelasEmAtraso = async (req, res, next) => {
     relatorioModelo.buscarUsuariosComParcelasEmAtraso(req, res, next)
}

//=====================================================================
//=====================Funções para Escola=============================
//=====================================================================

//Buscar receitas e aplicando filtros
exports.filtrarReceitasES = async (req, res, next) => {
     relatorioModeloEScola.filtrarReceitasES(req, res, next)
}

//Buscar receitas por Curso e Turma da Escola
exports.buscarReceitasPorCursoETurmaES = async (req, res, next) => {
     relatorioModeloEScola.buscarReceitasPorCursoETurmaES(req, res, next)
}

//Buscar receitas mes so valor
exports.buscarReceitasMesSoValorES = async (req, res, next) => {
     relatorioModeloEScola.buscarReceitasMesSoValorES(req, res, next)
}

//Buscar Receitas do Mês Só valor em atraso
exports.buscarReceitasMesSoValorEmAtrasoES = async (req, res, next) => {
     relatorioModeloEScola.buscarReceitasMesSoValorEmAtrasoES(req, res, next)
}

//Buscar receitas ano só valo
exports.buscarReceitasAnoSoValorES = async (req, res, next) => {
     relatorioModeloEScola.buscarReceitasAnoSoValorES(req, res, next)
}

//Buscar receitas ano so valor em atraso
exports.buscarReceitasAnoSoValorEmAtrasoES = async (req, res, next) => {
     relatorioModeloEScola.buscarReceitasAnoSoValorEmAtrasoES(req, res, next)
}

//Buscar todos os usuários com parcelas  EM ATRASO  escolhendo mês e ano
exports.buscarUsuariosComParcelasEmAtrasoES = async (req, res, next) => {
     relatorioModeloEScola.buscarUsuariosComParcelasEmAtrasoES(req, res, next)
}


