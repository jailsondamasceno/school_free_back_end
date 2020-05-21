const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const modeloInstituicoes = require('./instituicao.Modelo')

//Cadastrar Instituicão
exports.cadastrarInstituicao = async (req, res, next) => {
     try {
          modeloInstituicoes.cadastrarInstituicao(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar a instituicao!', e, res)
     }
}

//Buscar todas as Instituicões
exports.buscarInstituicoes = async function (req, res, next) {
     try {
          modeloInstituicoes.buscarInstituicoes(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar Instituições!', e, res)
     }
}


//Buscar Instituicão por Id do Criador
exports.buscarInstituicoesPorIdCriador = async function (req, res, next) {
     try {
          modeloInstituicoes.buscarInstituicoesPorIdCriador(req, res, next)

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar Instituições!', e, res)
     }
}

//Buscar Instituicão por Id 
exports.buscarInstituicaoPorID = async function (req, res, next) {
     try {
          modeloInstituicoes.buscarInstituicaoPorID(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao busca Instituição! ', e, res)
     }
}
exports.buscarChavesPagamento = async function (req, res, next) {
     try {
          modeloInstituicoes.buscarChavesPagamento(req,res,next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar chaves de pagamento !', e, res)
     }
}

//Atualizar instituição
exports.atualizarInstituicao = async (req, res, next) => {
     try {
          modeloInstituicoes.atualizarInstituicao(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar intituição', e, res)
     }

}

//Deletar instituição
exports.deletarInstituicao = async (req, res, next) => {
     try {
          modeloInstituicoes.deletarInstituicao(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar instituicao', e, res)
     }

}