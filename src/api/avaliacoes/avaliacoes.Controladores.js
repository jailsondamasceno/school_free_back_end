const db = require('../../config/firestore');
const horarioModelo  =require('./avaliacoes.Modelo')

//Cadastrar Avaliação
exports.cadastrarAvaliacao = async (req, res, next) => {
     horarioModelo.cadastrarAvaliacao(req,res,next)
}

//Buscar todos os Avaliações de um Aluno 
exports.buscarAvaliacoesPorAluno= async function (req, res, next) {
     horarioModelo.buscarAvaliacoesPorAluno(req,res,next)
}



//Buscar Avaliação  por Id 
exports.buscarAvaliacaoPorID = async function (req, res, next) {
     horarioModelo.buscarAvaliacaoPorID(req,res,next)
}

//Atualizar Avaliação
exports.atualizarAvaliacao = async (req, res, next) => {
    horarioModelo.atualizarAvaliacao(req,res,next)
}

//Deletar Avaliação
exports.deletarAvaliacao = async (req, res, next) => {
     horarioModelo.deletarAvaliacao(req,res,next)
 }

