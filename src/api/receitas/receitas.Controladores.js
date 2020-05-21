const db = require('../../config/firestore');
const modeloReceita  =require('./receitas.Modelo');


//pagar Parcela
exports.pagarParcela = async (req,res,next)=>{
        modeloReceita.pagarParcela(req,res,next)
    }

//Cadastrar Receita 
exports.cadastrarReceita = async (req, res, next) => {
    modeloReceita.cadastrarReceita(req, res, next)
}

//Buscar todas as Receitas  
exports.buscarReceitas = async function (req, res, next) {
    modeloReceita.buscarReceitas(req, res, next)
}


//Buscar Receita  por Id 
exports.buscarParcelasPorReceita = async function (req, res, next) {
    modeloReceita.buscarParcelasPorReceita(req, res, next)
}

//Buscar Receita  Usuario 
exports.buscarReceitaPorUsuario = async (req,res, next)=>{
    modeloReceita.buscarReceitaPorUsuario(req,res, next)
}

//Buscar uma única receita
exports.buscarReceitaPorID = async (req,res, next)=>{
    modeloReceita.buscarReceitaPorID(req,res, next)
}

//Buscar parcela Por ID
exports.buscarParcelaPoId = async(req, res, next)=>{
    modeloReceita.buscarParcelaPoId(req,res, next)
}

//Atualizar Receita 
exports.atualizarReceita = async (req, res, next) => {
     modeloReceita.atualizarReceita(req, res, next)
}

//Atualizar uma Parcela
exports.atualizarParcela = async (req, res, next)=>{
    modeloReceita.atualizarParcela(req, res, next)
}

/* //Deletar Receita 
exports.deletarReceita = async (req, res, next) => {
     modeloReceita.deletarReceita(req, res, next)
} */


//Atualizar status das parcelas
//exports.atualizarStatusParcela = async (req, res, next)=>{
  //  modeloReceita.
//}