const db = require('../../config/firestore');
const modeloEmail  =require('./email.Modelo');

//Cadastrar Receita 
exports.enviarEmail = async (req, res, next) => {
    modeloEmail.enviarEmail(req, res, next)
}

