const jwt = require('jsonwebtoken')
const env = require('../../.env')

module.exports = (req, res, next) => {
     // CORS preflight request
     if (req.method === 'OPTIONS') {
         next()
     } else {
         const token = req.body.token || req.query.token || req.headers['authorization']
 
         if (!token) {
             return res.status(403).send({ errors: ['Sem token de autenticação!'] })
         }
 
         jwt.verify(token, env.auth.authSecret, function (err, decoded) {
             if (err) {
                 return res.status(403).send({
                     errors: ['Falha em autenticar o token']
                 })
             } else {
                 req.decoded = decoded
                 next()
             }
         })
     }
 }