const { Router } = require('express');
const controladorCategoria = require('./categoria.controladores')
const auth = require('../../config/auth')


const routes = new Router();


 //Categorias
routes.post('/cadastrar/:id_instituicao',auth,controladorCategoria.cadastrarCategoria);
routes.get('/todasInstituicao/:id_instituicao',auth,controladorCategoria.buscarCategorias);
routes.get('/categoriaPorId/:id_instituicao/:id_categoria',auth,controladorCategoria.buscarCategoriaPorID);
//routes.get('/categoriasPorTipo/:id_instituicao',auth,controladorCategoria.buscarCategoriasPorTipo);
routes.patch('/atualizar/:id_instituicao/:id_categoria',auth,controladorCategoria.atualizarCategoria);
routes.delete('/deletar/:id_instituicao/:id_categoria',auth,controladorCategoria.deletarCategoria);

//Subcategorias
routes.post('/subcategoria/cadastrar/:id_instituicao/:id_categoria',auth,controladorCategoria.cadastrarSubcategoria);
routes.get('/subcategorias/todasCategoria/:id_instituicao/:id_categoria',auth,controladorCategoria.buscarSubcategorias);
routes.get('/subcategoria/subPorId/:id_instituicao/:id_categoria/:id_subcategoria',auth,controladorCategoria.buscarSubcategoriaPorID);
routes.patch('/subcategoria/atualizar/:id_instituicao/:id_categoria/:id_subcategoria',auth,controladorCategoria.atualizarSubcategoria);
routes.delete('/subcategoria/deletar/:id_instituicao/:id_categoria/:id_subcategoria',auth,controladorCategoria.deletarSubcategoria);

module.exports = routes;