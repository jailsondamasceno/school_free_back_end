const db = require('../../config/firestore');
const modeloProd_Servico  =require('./prod_e_serv.Modelo');

//Cadastrar Produto ou Serviço 
exports.cadastrarProd_Servico = async (req, res, next) => {
    modeloProd_Servico.cadastrarProd_Servico(req, res, next)
}

//Buscar todas os Produto ou Serviço  
exports.buscarProd_Servicos = async function (req, res, next) {
    modeloProd_Servico.buscarProd_Servicos(req, res, next)
}
//Buscar todas os Produto ou Serviço de uma escola 
exports.buscarProd_Serv_por_Escola = async function (req, res, next) {
    modeloProd_Servico.uscarProd_Serv_por_Escola(req, res, next)
}


//Buscar Produto ou Serviço  por Id 
exports.buscarProd_ServicoPorID = async function (req, res, next) {
    modeloProd_Servico.buscarProd_ServicoPorID(req, res, next)
}

//Atualizar Produto ou Serviço 
exports.atualizarProd_Servico = async (req, res, next) => {
     modeloProd_Servico.atualizarProd_Servico(req, res, next)
}

//Deletar Produto ou Serviço 
exports.deletarProd_Servico = async (req, res, next) => {
     modeloProd_Servico.deletarProd_Servico(req, res, next)
}