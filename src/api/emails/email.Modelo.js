const db = require('../../config/firestore');
const temorisador = require('node-schedule')
const momento = require('../../utilidades/moment')
const nodemailer = require('nodemailer')
const pegaErros = require('../../utilidades/manipulaErro');
const emailRegex = /\S+@\S+\.\S+/

//==========FUNÇÔES DESTE ESCOPO===================================

//=================================================================


//email de recuperação de senha
const emailRecuperaSenha = async (dados)=>{
    try{
       
        nodemailer.createTestAccount((err, account) => {
             let transporter = nodemailer.createTransport({
                  host: 'smtp.ethereal.email',
                  port: 587,
                  secure: false,
                  auth: {
                      user: 'g33gueddmasqc7nk@ethereal.email',
                      pass: '2cwhjrn8RkhY1xdP9P' 
                 }
             });
         
             let mailOptions = {
                 from: '"Eduxe Ligth 👻" <suporte@eduxelith.com.br>', // sender address
                 to: `${dados.email}`, // list of receivers
                 subject: `Recuperação de senha!`, // Subject line
                 text: `Olá, ${dados.nome}!`, // plain text body
                 html: `<b> Essa é sua nova senha temporária, não esqueça de trocá-la:  ${dados.novaSenha}</b>` // html body
             };
         
             // send mail with defined transport object
             transporter.sendMail(mailOptions, (error, info) => {
                 if (error) {
                     return  console.log(error);
                 }
                 console.log('Message sent: %s', info.messageId);
                 // Preview only available when sending through an Ethereal account
                 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         
                 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
             });
         });
}catch(e){
   pegaErros.manipulaErros('Erro no envio dos emails',e, res)
}

}
//email troca de senha
const emailTrocaSenha = async (dados)=>{
    try{
        
        nodemailer.createTestAccount((err, account) => {
             let transporter = nodemailer.createTransport({
                  host: 'smtp.ethereal.email',
                  port: 587,
                  secure: false,
                  auth: {
                      user: 'g33gueddmasqc7nk@ethereal.email',
                      pass: '2cwhjrn8RkhY1xdP9P' 
                 }
             });
         
             let mailOptions = {
                 from: '"Eduxe Ligth 👻" <suporte@eduxelith.com.br>', // sender address
                 to: `${dados.email}`, // list of receivers
                 subject: `Troca de senha!`, // Subject line
                 text: `Olá, ${dados.nome}!`, // plain text body
                 html: `<b>${dados.nome}, Você acabou de trocar a sua senha de acesso! Caso não tenha sido você, entre em contato conosco!</b>` // html body
             };
         
             // send mail with defined transport object
             transporter.sendMail(mailOptions, (error, info) => {
                 if (error) {
                     return  console.log(error);
                 }
                 console.log('Message sent: %s', info.messageId);
                 // Preview only available when sending through an Ethereal account
                 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         
                 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
             });
         });
}catch(e){
   pegaErros.manipulaErros('Erro no envio dos emails',e, res)
}

}


//Email de boas vindas
const emailDeBoasVindas = async (email)=>{
     try{
                
          nodemailer.createTestAccount((err, account) => {
               // create reusable transporter object using the default SMTP transport
               let transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'g33gueddmasqc7nk@ethereal.email',
                        pass: '2cwhjrn8RkhY1xdP9P' 
                   }
               });
           
               // setup email data with unicode symbols
               let mailOptions = {
                   from: '"Eduxe Ligth 👻" <relacionamento@eduxelith.com.br>', // sender address
                   to: `${email.email}`, // list of receivers
                   subject: `Cadastro na Platafoma Eduxe Ligth ✔`, // Subject line
                   text: `Olá, ${email.nome}!`, // plain text body
                   html: `<b> ${email.nome}, seja bem vindo(a) ao EduxeLigth!  Para acessar a platafomra, utilize o email cadastrado  e seu cpf como senha! </b>` // html body
               };
           
               // send mail with defined transport object
               transporter.sendMail(mailOptions, (error, info) => {
                   if (error) {
                       return  console.log(error);
                   }
                   console.log('Message sent: %s', info.messageId);
                   // Preview only available when sending through an Ethereal account
                   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
           
                   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
               });
           });
        
}catch(e){
     pegaErros.manipulaErros('Erro no envio dos emails',e, res)
}

}

module.exports = {emailDeBoasVindas,emailRecuperaSenha,emailTrocaSenha}