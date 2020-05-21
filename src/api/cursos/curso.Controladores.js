const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const cursoModelo =require('./curso.Modelo')



//Tipos duração
exports.tiposDuracao = async function (req, res, next) {
     try {
           cursoModelo.tiposDuracao(req,res,next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cursos!', e, res)
     }
}



//Cadastrar curso
exports.cadastrarCurso = async (req, res,next) => {
     try {
          cursoModelo.cadastrarCurso(req, res,next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar curso!', e, res)
     }
}


//Buscar os Cursos de uma escola
exports.buscarCursosInstituicao = async function (req, res, next) {
     try {
          cursoModelo.buscarCursosInstituicao(req, res,next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cursos!', e, res)
     }
}

//Buscar os Cursos de uma escola
exports.buscarCursosEscola = async function (req, res, next) {
     try {
          cursoModelo.buscarCursosEscola(req, res,next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cursos!', e, res)
     }
}



//Buscar Curso  por Id 
exports.buscarCursoPorID = async function (req, res, next) {
     try {
          cursoModelo.buscarCursoPorID(req, res,next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar curso!', e, res)
     }
}

//Atualizar Curso
exports.atualizarCurso = async (req, res, next) => {
     try {
          cursoModelo.atualizarCurso(req, res,next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar curso!', e, res)
     }
}


//Deletar Curso
exports.deletarCurso = async (req, res, next) => {
     try {
          cursoModelo.deletarCurso(req, res,next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar curso!', e, res)
     }
}