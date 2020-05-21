const  db  = require('../../config/firestore')
const relatoriosModelo = require('./relatorios.Modelo')


//Buscar alunos e aplicando filtros

exports.buscarAlunos = async (req, res, next)=>{
     relatoriosModelo.buscarAlunos(req, res, next)
}

//Buscar alunos da instituicao so valor 
exports.buscarAlunosDaInstituicaoSoValor = async (req, res, next) => {
     relatoriosModelo.buscarAlunosDaInstituicaoSoValor(req,res,next)
}

//Buscar alunos de uma escola
exports.buscarAlunosPorEscola = async(req, res, next)=>{
     relatoriosModelo.buscarAlunosPorEscola(req, res, next)     
}

//Buscar alunos um curso
exports.buscarAlunosPorCurso = async(req, res, next)=>{
     relatoriosModelo.buscarAlunosPorCurso(req, res, next)     
}