const db = require('../../config/firestore');
const modelo_Loja  =require('./loja.Modelo');

//Cadastrar Produto ou Serviço 
exports.cadastrarProd_Servico = async (req, res, next) => {
    modelo_Loja.cadastrarProd_Servico(req, res, next)
}

//Buscar todas as Produto ou Serviço  da insituicao
exports.buscarProd_Servicos = async function (req, res, next) {
    modelo_Loja.buscarProd_Servicos(req, res, next)
}
//Buscar todas as Produto ou Serviço  da escola
exports.buscarProd_ServicosEscola = async function (req, res, next) {
    modelo_Loja.buscarProd_ServicosEscola(req, res, next)
}


//Buscar Produto ou Serviço  por Id 
exports.buscarProd_ServicoPorID = async function (req, res, next) {
    modelo_Loja.buscarProd_ServicoPorID(req, res, next)
}

//Atualizar Produto ou Serviço 
exports.atualizarProd_Servico = async (req, res, next) => {
     modelo_Loja.atualizarProd_Servico(req, res, next)
}

//Deletar Produto ou Serviço 
exports.deletarProd_Servico = async (req, res, next) => {
     modelo_Loja.deletarProd_Servico(req, res, next)
}