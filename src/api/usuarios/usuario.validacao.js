const Joi  = require('joi');
const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

 const signup =  {
         email: Joi.string().email().required(),
         password: Joi.string().regex(passwordReg).required(),
         primeiroNome: Joi.string().required(),
         sobrenome: Joi.string().required(),
         userName: Joi.string().required(),
     }


 module.exports = {signup, passwordReg}