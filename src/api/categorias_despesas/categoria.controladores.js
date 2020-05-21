const db = require('../../config/firestore');
const modeloCategorias = require('../categorias_despesas/categoria.modelo')


//Todas as validações serão aplicadas aqui

//Categorias-------------------------------------------------------------------------

//Criar Categoria 
exports.cadastrarCategoria = async (req, res, next) => {

  modeloCategorias.cadastrarCategoria(req, res, next)
}

 //Buscar Categorias 
exports.buscarCategorias = async function (req, res, next) {
  modeloCategorias.buscarCategorias(req, res, next)
}


//Busca  Categoria  por ID
exports.buscarCategoriaPorID = async function (req, res, next) {

  modeloCategorias.buscarCategoriaPorID(req, res, next)
}



//Atualiza uma Categoria 
exports.atualizarCategoria = async function (req, res, next) {
  
  modeloCategorias.atualizarCategoria(req, res, next)
  
} 

//Buuscar categoria por Tipo
exports.buscarCategoriasPorTipo = async function(req,res,next){
  modeloCategorias.buscarCategoriasPorTipo(req,res,next)
}



//Deletar uma Categoria
exports.deletarCategoria = async function (req, res, next) {

  modeloCategorias.deletarCategoria(req, res, next)
} 

//Subcategorias-------------------------------------------------------------------------

//Criar Subcategoria 
exports.cadastrarSubcategoria = async (req, res, next) => {

  modeloCategorias.cadastrarSubcategoria(req, res, next)
}

 //Buscar Subcategoria 
exports.buscarSubcategorias = async function (req, res, next) {
  modeloCategorias.buscarSubcategorias(req, res, next)
}


//Busca  Subcategoria  por ID
exports.buscarSubcategoriaPorID = async function (req, res, next) {

  modeloCategorias.buscarSubcategoriaPorID(req, res, next)
}



//Atualiza uma Subcategoria 
exports.atualizarSubcategoria = async function (req, res, next) {
  
  modeloCategorias.atualizarSubcategoria(req, res, next)
  
} 



//Deletar uma Subcategoria
exports.deletarSubcategoria = async function (req, res, next) {

  modeloCategorias.deletarSubcategoria(req, res, next)
} 
