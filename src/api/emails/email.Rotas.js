const { Router } = require('express');
const controladorEmail = require('./email.Controladores');
const auth = require('../../config/auth');




const routes = new Router();

routes.post('/enviarEmails',auth,controladorEmail.enviarEmail);

module.exports = routes;