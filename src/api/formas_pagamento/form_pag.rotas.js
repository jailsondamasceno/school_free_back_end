const { Router } = require('express');
const controladorFormPag = require('./form_pag.controladores')
const auth = require('../../config/auth')


const routes = new Router();

routes.get('/todos',auth,controladorFormPag.buscarFormPag);
routes.get('/formPagPorId/:id_FormPag',auth,controladorFormPag.buscarFormPagPorID);




module.exports = routes;