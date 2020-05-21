const db = require('../../config/firestore');
const modeloFormPag = require('./form_pag.modelo')


/* 
//Cadastrar Form_Pag
exports.criarForPag = async (req, res,next) => {
    modeloForm_Pag.criarForPag(req, res, next)
} */

//Busca todos as Formas de Pagamento 
exports.buscarFormPag = async function (req, res, next) {
    modeloFormPag.buscarFormPag(req, res, next)
}


//Busca uma unico Formas de Pagamento
exports.buscarFormPagPorID = async function (req, res, next) {
    modeloFormPag.buscarFormPagPorID(req, res, next)
}
/*

//Atualiza um Form_Pag de uma escola.
exports.atualizarFormPag = async function (req, res, next) {
    modeloForm_Pag.atualizarFormPag(req, res, next)
}

//Deletar Formas de Pagamento
exports.deletarFormPag = async function (req, res, next) {
    modeloForm_Pag.deletarFormPag(req, res, next)
} */


