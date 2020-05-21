const db = require('../../config/firestore');
const modeloDespesa  =require('./despesas.Modelo');

//Cadastrar Despesa 
exports.cadastrarDespesa = async (req, res, next) => {
    modeloDespesa.cadastrarDespesa(req, res, next)
}

//Buscar todas as Despesas  
exports.buscarDespesas = async function (req, res, next) {
    modeloDespesa.buscarDespesas(req, res, next)
}


//Buscar Despesa  por Id 
exports.buscarDespesaPorID = async function (req, res, next) {
    modeloDespesa.buscarDespesaPorID(req, res, next)
}

//Atualizar Despesa 
exports.atualizarDespesa = async (req, res, next) => {
     modeloDespesa.atualizarDespesa(req, res, next)
}

/* //Deletar Despesa 
exports.deletarDespesa = async (req, res, next) => {
     modeloDespesa.deletarDespesa(req, res, next)
} */