const _ = require('lodash')
const Log = require('log')
log = new Log('info');



const sendErrorsFromDB = (res, dbErrors) => {
     const errors = []
     _.forIn(dbErrors.errors, error => errors.push(error.message))
     return res.status(400).json({ errors })
}


const validaAdmin = async (req, res, next) => {

     perfil = req.body.perfil || ''
     log.info('perfil');
     if (perfil == undefined || perfil == null || perfil !== 'ADMIN') {

          return res.status(401).send({ errors: ['Permissão negada!'] })
     }
     next()
}

const validaEmpresa = async (req, res, next) => {
     perfil = req.body.perfil || ''
     if (perfil == undefined || perfil == null || perfil !== 'EMPRESA') {
          return res.status(401).send({ errors: ['Permissão negada!'] })
     }
     next()
}


const validaCliente = async (req, res, next) => {
     perfil = req.body.perfil || ''
     if (perfil == undefined || perfil == null || perfil !== 'CLIENTE') {
          return res.status(401).send({ errors: ['Permissão negada!'] })
     }
     next()
}


const permissao = async (req, res, next) => {


}

module.exports = { validaAdmin, validaEmpresa, validaCliente }