const db = require('../../config/firestore');
const turmaModelo = require('./turma.modelo')
const pegaErros = require('../../utilidades/manipulaErro');

//Cadastrar Escola
exports.cadastrarTurma = async (req, res, next) => {
     try {
          turmaModelo.cadastrarTurma(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao criar turma!', e, res)
     }
}

//Buscar todas as turmas abertas da Intituicao so valor
exports.buscarTurmasAbertasInstituicaoSoValor = async (req,res,next)=>{
     try{
          turmaModelo.buscarTurmasAbertasInstituicaoSoValor(req,res,next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
     }

//Buscar todas as Escolas de uma instituicão
exports.buscarTurmas = async function (req, res, next) {
     try {
          turmaModelo.buscarTurmas(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}

//Buscar todas as Turmas de um curso
exports.buscarTurmasCurso = async function (req, res, next) {
     try {
          turmaModelo.buscarTurmasCurso(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}

//Buscar todas as Turmas de um curso por escola escola
exports.buscarTurmasCursoEscola = async function (req, res, next) {
     try {
          turmaModelo.buscarTurmasCursoEscola(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}

//Buscar todas as Turmas de uma escola
exports.buscarTurmasEscola = async function (req, res, next) {
     try {
          turmaModelo.buscarTurmasEscola(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}



//Buscar Escola  por Id 
exports.buscarTurmaPorID = async function (req, res, next) {
     try {
          turmaModelo.buscarTurmaPorID(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turma!', e, res)
     }
}

//Atualizar instituição
exports.atualizarTurma = async (req, res, next) => {
     try {
          turmaModelo.atualizarTurma(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar turmas!', e, res)
     }
}

//Buscar todos os ALUNOS de uma Turma
exports.alunosPorTurma = async (req, res, next) => {
     try {
          turmaModelo.alunosPorTurma(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar alunos!', e, res)
     }
}
//Buscar todos os PROFESSORES de uma Turma
exports.professoresPorTurma = async (req, res, next) => {
     try {
          turmaModelo.professoresPorTurma(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar professores!', e, res)
     }
}

