const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const modeloEscolas = require('./escola.Modelo')



//categorias escolas
exports.categoriasEscolas= async(req,res,next)=>{
     try{
          modeloEscolas.categoriasEscolas(req,res,next)
     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar categorias!', e, res)
     }
}
//categorias escolas por id
exports.categoriasEscolasPorID= async(req, res, next)=>{
     try{
         modeloEscolas.categoriasEscolasPorID(req,res,next)
     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar categorias!', e, res)
     }
}


//Cadastrar Escola
exports.cadastrarEscola = async (req, res, next) => {
     try {
          modeloEscolas.cadastrarEscola(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar escola!', e, res)
     }
}

//Buscar todas as Escolas de uma instituicão
exports.buscarEscolas = async function (req, res, next) {
     try {
          modeloEscolas.buscarEscolas(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar escolas!', e, res)
     }
}



//Buscar Escola  por Id 
exports.buscarEscolaPorID = async function (req, res, next) {
     try {
          modeloEscolas.buscarEscolaPorID(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar escola!', e, res)
     }
}

//Atualizar Escola
exports.atualizarEscola = async (req, res, next) => {
     try {
          modeloEscolas.atualizarEscola(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar escola!', e, res)
     }
}

//Deletar Escola
exports.deletarEscola = async (req, res, next) => {
     try {
          modeloEscolas.deletarEscola(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar escola!', e, res)
     }
}