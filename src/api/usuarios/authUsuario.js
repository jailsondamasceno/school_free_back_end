const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require('../../../.env')
const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')
const { emailDeBoasVindas,emailRecuperaSenha,emailTrocaSenha } = require('../emails/email.Modelo')

const dataAtual = momento.moment().format('DD/MM/YYYY')
const novaSenha = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}${Date.now()}`;


const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/


//Esqueceu a senha
exports.recuperaSenha = async (req,res,next)=>{
    try {
       await  db.collection('usuarios').where('email','==',`${req.body.email}`).get()
        .then(docs=>{
            if(docs.size < 1){
              return   res.status(404).json('Não encontramos nenhum usuário com esse e-mail!')
            }else{
                docs.forEach(doc=>{
                    const salt = bcrypt.genSaltSync()
                    const senhaHash = bcrypt.hashSync(novaSenha, salt) 
                    db.collection('usuarios').doc(`${doc.id}`).update({senha:senhaHash})
                    const dados = {email:req.body.email,novaSenha:novaSenha}
                    emailRecuperaSenha(dados)                    
                })
                
                return res.status(200).json('Uma nova senha temporária foi envida para seu e-mail!')
                
            }

        })


    } catch (e) {
        return pegaErros.manipulaErros('Erro no cadastro!', e, res)
    }
}
//Esqueceu a senha
exports.trocarSenha = async (req,res,next)=>{
    try { 
        const salt = bcrypt.genSaltSync()
        const senhaHash = bcrypt.hashSync(req.body.novaSenha, salt)  
        if(!bcrypt.compareSync(req.body.confirmaNovaSenha, senhaHash)){
            return res.status(400).json('Senhas não conferem!')                    
            
        }else {
            await  db.collection('usuarios').doc(`${req.params.id_usuario}`).get()
            .then(doc=>{
                if( bcrypt.compareSync(req.body.senhaAntiga, doc.data().senha)){                    
                    db.collection('usuarios').doc(`${req.params.id_usuario}`).update({senha:senhaHash})
                    const dados = {nome:doc.data().nome,email:doc.data().email}
                    emailTrocaSenha(dados)  

                    return res.status(200).json('Sua senha foi alterada com sucesso!')
                  
                }else{
                    
                    return res.status(400).json('Senha antiga não confere!')
                    
                }
    
            }).catch(err => { return err });
            
        }     


    } catch (e) {
        return pegaErros.manipulaErros('Erro no cadastro!', e, res)
    }
}

//cadastrar-se na plataforma
exports.cadastroNaPlataforma = async (req, res, next) => {
    try {
        const dias_de_teste = 30
        const status_instituicao = 'EM TESTE'
        const nome = req.body.nome
        const sobrenome = req.body.sobrenome
        const data_cadastro = dataAtual
        const cpf = req.body.cpf
        const nomeInstituicao = req.body.nomeInstituicao
        const cnpj = req.body.cnpj
        const email = req.body.email
        const perfis = ['SUPER_ADMIN']
        const senha = req.body.senha
        const confirmaSenha = req.body.confirmaSenha

        if (!email.match(emailRegex)) {
            return res.status(400).json('O e-mail informado está inválido')
        }

        /*  if (!senha.match(passwordRegex)) {
             return res.status(400).json({ errors: "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6-20." })
         } */
        const salt = bcrypt.genSaltSync()
        const senhaHash = bcrypt.hashSync(senha, salt)//encriptamos a senha

        if (!bcrypt.compareSync(confirmaSenha, senhaHash)) {

            return res.status(401).json('Senhas não conferem!')
        }

        await db.collection('usuarios').where('email', '==', `${req.body.email}`).get()
            .then(doc => {              //Verificamos se já existe outro usuário cadastrado com esse e-mail
                if (!doc.empty) {
                    return res.status(400).json('Usuário já cadastrado!');
                } else {

                    const id_interno = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}${Date.now()}`;
                    var instituicao = { nomeInstituicao: nomeInstituicao, cnpj: cnpj, data_cadastro: dataAtual, id_interno: id_interno, dias_de_teste:dias_de_teste,status_instituicao:status_instituicao }
                    //Salavamos a Intituição
                    db.collection('instituicoes').add(instituicao)
                    var id_instituicao = [] //Salvamos o id_da intituição que acabamos de cadastar
                    db.collection('instituicoes').where('id_interno', '==', `${id_interno}`).get()
                        .then(docs => {  //Buscamos a intituição que salvamos anteriormente pegamos o  id
                            docs.forEach(doc => { id_instituicao.push(doc.id) })

                            const id_internoUser = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}${Date.now()}`;

                            //Adicionamos o id do usurio na Instituição
                            var usuario = { id_interno: id_internoUser, nome, email: req.body.email, sobrenome, cpf, perfis, data_cadastro, id_instituicao: id_instituicao[0], senha: senhaHash }

                            var id_usuario = []//Salvamos o id_do usuario que acabamos de cadastraR
                            db.collection('usuarios').add(usuario); //Salvamos o usuario
                            db.collection('usuarios').where('id_interno', '==', `${id_internoUser}`).get()
                                .then(docs => { //Buscamos o usuário que salvamos enteriomente e pegamo o id
                                    docs.forEach(doc => { id_usuario.push(doc.id) })
                                    //Atualizamos a instituição com o id do Usuario
                                    db.collection('instituicoes').doc(`${id_instituicao[0]}`).update({ id_criador: id_usuario[0] })

                                    //Mandamos um e-mail de boas vindas
                                    var email = {
                                        nome: usuario.nome,
                                        email: usuario.email
                                    }

                                    emailDeBoasVindas(email)
                                    //Retornamos para o usuário
                                    res.status(201).json(`Usuário cadastrado com sucesso!`)
                                })

                        })

                }

            }).catch(err => { return err })


    } catch (e) {
        return pegaErros.manipulaErros('Erro no cadastro!', e, res)
    }
}


//Fazer o Login
exports.login = async (req, res, next) => {
    try {
        const email = req.body.email || ''
        const senha = req.body.senha || ''
        await db.collection('usuarios').where('email', '==', `${email}`).get()
            .then(docs => {
                if (docs.size < 1) {
                    res.status(403).json('Usuário não encontrado')
                } else {
                    docs.forEach(doc => {
                        if (doc.exists && bcrypt.compareSync(senha, doc.data().senha)&& doc.data().status==='ATIVO') {

                            const dadosToken = { email: doc.data().email, perfil_atual: doc.data().perfil_atual }

                            const token = jwt.sign(dadosToken, env.auth.authSecret, { expiresIn: "1 day" })
                            const usuario = {
                                id: doc.id,
                                nome: doc.data().nome,
                                sobrenome: doc.data().sobrenome,
                                id_instituicao: doc.data().id_instituicao,
                                id_escola:doc.data().id_escola,
                                email: doc.data().email,
                                perfil_atual: doc.data().perfil_atual,
                                data_cadastro: doc.data().data_cadastro,
                                imagem_perfil:doc.data().imagem_perfil,
                                token: token
                            }
                            res.status(200).json(usuario)
                        } else {
                            res.status(403).json('Usuário ou senha Inválidos ou Inativo!')
                        }

                    })
                }

            }).catch(err => { return err })

    } catch (e) {
        return pegaErros.manipulaErros('Erro ao logar-se!', e, res)
    }
}

//Validar o token
exports.validateToken = (req, res, next) => {
    try {
        const token = req.body.token || ''

        jwt.verify(token, env.auth.authSecret, function (err, decoded) {
            return res.status(200).send({ valid: !err })
        })
    } catch (e) {
        return pegaErros.manipulaErros('Token inválido!', e, res)
    }
}


