const  db  = require('../../config/firestore')
const relatoriosModelo = require('./relatorios.Model.Despesas')


//Buscar despesas e aplicando filtros
exports.buscarDerspesasComFiltro = async (req, res, next)=>{
     relatoriosModelo.buscarDerspesasComFiltro(req, res, next)
}

 //Buscar despesas mensais
exports.despesasMensais = async (req, res, next)=>{
     relatoriosModelo.despesasMensais(req, res, next)     
}


//Buscar despesas mensais somente valor
exports.despesasMensaisValorTotal = async(req, res, next)=>{
     relatoriosModelo.despesasMensaisValorTotal(req, res, next)     
} 

//Buscar despesas do ano, somente valor
exports.despesasAnoValorTotal = async(req, res, next)=>{
     relatoriosModelo.despesasAnoValorTotal(req, res, next)     
} 

//===================POR ESCOLA ==========================

//Buscar despesas e aplicando filtros
exports.despesasPorCategoriaEscola = async (req, res, next)=>{
     relatoriosModelo.despesasPorCategoriaEscola(req, res, next)
}

 //Buscar despesas mensais
exports.despesasMensaisEscola = async (req, res, next)=>{
     relatoriosModelo.despesasMensaisEscola(req, res, next)     
}


//Buscar despesas mensais somente valor
exports.despesasMensaisValorTotalEscola = async(req, res, next)=>{
     relatoriosModelo.despesasMensaisValorTotalEscola(req, res, next)     
} 

//Buscar despesas do ano, somente valor
exports.despesasAnoValorTotalEscola = async(req, res, next)=>{
     relatoriosModelo.despesasAnoValorTotalEscola(req, res, next)     
} 


