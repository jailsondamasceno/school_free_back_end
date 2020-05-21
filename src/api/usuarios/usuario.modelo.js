const db = require('../../config/firestore')
const pegaErros = require('../../utilidades/manipulaErro')
const momento = require('../../utilidades/moment')
const { emailDeBoasVindas } = require('../emails/email.Modelo')
const bcrypt = require('bcrypt')
const api_pagamento = require('../../../.env')
const Gerencianet = require('gn-api-sdk-node');

const dataAtual = momento.moment().format('DD/MM/YYYY')
const emailRegex = /\S+@\S+\.\S+/

const ViaCep = require('node-viacep').default
global.fetch = require('node-fetch');

//Buscar CEP
exports.buscarCep = async (req, res, next) => {
     try {
          console.log(req.params.cep)
          const viacep = new ViaCep({
               type: 'json'
          })
          const ender = await viacep.zipCod.getZip(`${req.params.cep}`)
          const endereco = await ender.json()

          res.status(200).json(endereco)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cep', e, res)
     }
}

//Matricular
exports.matricular = async (req, res, next) => {
     try {
          const aluno = req.body.aluno
          aluno.filiacoes = req.body.aluno.filiacoes || []
          const filiacao = req.body.responsavel
          filiacao.filhos = req.body.responsavel.filhos || []
          await cadastrarAluno_Matricula(aluno)
          const alunoMatri = await db.collection('usuarios').where('email', '==', `${aluno.email}`).get()
          var alunoMatriculado = {}
          await alunoMatri.forEach(doc => {
               const al = {
                    id: doc.id,
                    ...doc.data()
               }
               delete al.senha
               alunoMatriculado = al
          })
          console.log(aluno)
          if (aluno.filiacoes.length == 0) {//inicio if
                filiacao.filhos.push(alunoMatriculado.id)
               await cadastrarFiliacao_Matricula(alunoMatriculado, filiacao)
               const filiacaoC = await db.collection('usuarios').where('email', '==', `${filiacao.email}`).get()
               var filiacaoCriada = {}
               filiacaoC.forEach(doc => {
                    const fl = {
                         id: doc.id,
                         ...doc.data()
                    }
                    delete fl.senha
                    filiacaoCriada = fl
               })

               await alunoMatriculado.filiacoes.push(filiacaoCriada.id)
               console.log(alunoMatriculado)
               console.log(filiacaoCriada)
               console.log('Passou 01')
               await db.collection('usuarios').doc(`${alunoMatriculado.id}`).update(alunoMatriculado)
          }else{//fim if
               console.log('Passou 02')
               await db.collection('usuarios').doc(`${filiacao.id}`).update(filiacao)
          }//fim else

          res.status(200).json(alunoMatriculado)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao matricular o aluno', e, res)
     }
}

//Pagar
exports.pagar = async (req, res, nex) => {
     try {
     } catch (e) {
          return pegaErros.manipulaErros('Erro no pagamento', e, res)
     }
}

//Buscar perfis
exports.buscarPerfis = async function (req, res, next) {
     try {
          await db.collection('perfis').orderBy('perfil').get().then(docs => {
               var perfis = [];
               docs.forEach(doc => {
                    var perfil = {
                         perfil: doc.data().perfil
                    }
                    perfis.push(perfil)
               });
               return res.status(200).json(perfis)

          }).catch(err => { return err })
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar perfis!', e, res)
     }
}



//Cadastrar ADMIN
exports.cadastrarAdmin = async function (req, res, next) {
     try {
          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(req.body.cpf, salt)//encriptamos a senha

          const admin = {
               id_instituicao: req.body.id_instituicao,
               nome: req.body.nome,
               sobrenome: req.body.sobrenome,
               status: req.body.status || 'ATIVO',
               imagem_perfil: req.body.url_imagem_perfil || '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: req.body.idioma,
               aplicaDesconto: req.body.aplicaDesconto || 'NÂO',
               desconto_max: req.body.desconto_max || 0,
               cpf: req.body.cpf,
               rg: req.body.rg || '',
               data_nascimento: req.body.data_nascimento,
               telefone: req.body.telefone,
               email: req.body.email,
               perfis: req.body.perfis || ["ADMIN"],
               perfil_atual: req.body.perfil_atual,
               senha: senhaHash,
               pais: req.body.pais,
               estado: req.body.estado,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
               cep: req.body.cep

          }
          await db.collection('usuarios').add(admin)
          var email = {
               nome: req.body.nome,
               email: req.body.email
          }

          await emailDeBoasVindas(email)

          res.status(201).json(`Usuário cadastrado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar usuário!', e, res)
     }

};

//Cadastrar Diretor
exports.cadastrarDiretor = async function (req, res, next) {
     try {

          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(req.body.cpf, salt)//encriptamos a senha

          const diretor = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               nome: req.body.nome,
               sobrenome: req.body.sobrenome,
               status: req.body.status || 'ATIVO',
               imagem_perfil: req.body.url_imagem_perfil || '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: req.body.idioma,
               aplicaDesconto: req.body.aplicaDesconto || 'NÂO',
               desconto_max: req.body.desconto_max || 0,
               cpf: req.body.cpf,
               rg: req.body.rg || '',
               data_nascimento: req.body.data_nascimento,
               telefone: req.body.telefone,
               email: req.body.email,
               perfis: req.body.perfis || ["DIRETOR"],
               perfil_atual: req.body.perfil_atual,
               senha: senhaHash,
               pais: req.body.pais,
               estado: req.body.estado,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
               cep: req.body.cep,
               compras: req.body.compras || []

          }
          await db.collection('usuarios').add(diretor)
          var email = {
               nome: req.body.nome,
               email: req.body.email
          }

          await emailDeBoasVindas(email)

          res.status(201).json(`Usuário cadastrado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar usuário!', e, res)
     }

};


//Cadastrar professor
exports.cadastrarProfessor = async (req, res, next) => {

     try {
          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(req.body.cpf, salt)//encriptamos a senha

          const professor = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               nome: req.body.nome,
               sobrenome: req.body.sobrenome,
               status: req.body.status || 'ATIVO',
               imagem_perfil: req.body.imagem_perfil || '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: req.body.idioma,
               aplicaDesconto: req.body.aplicaDesconto || 'NÂO',
               desconto_max: req.body.desconto_max || 0,
               cpf: req.body.cpf,
               rg: req.body.rg || '',
               data_nascimento: req.body.data_nascimento,
               telefone: req.body.telefone,
               email: req.body.email,
               perfis: req.body.perfis || ["PROFESSOR"],
               perfil_atual: req.body.perfil_atual,
               senha: senhaHash,
               pais: req.body.pais,
               estado: req.body.estado,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
               cep: req.body.cep,
               disciplinas: req.body.disciplinas || [],
               turmas: req.body.turmas || [],
               compras: req.body.compras || [],

          }
          await db.collection('usuarios').add(professor)
          var email = {
               nome: req.body.nome,
               email: req.body.email
          }

          await emailDeBoasVindas(email)

          res.status(201).json(`Usuário cadastrado com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar usuário!', e, res)
     }
}

//Cadastrar FILIAÇÃO
exports.cadastrarFiliacao = async (req, res, next) => {
     try {
          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(req.body.cpf, salt)//encriptamos a senha

          const filiacao = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               nome: req.body.nome,
               sobrenome: req.body.sobrenome,
               status: req.body.status || 'ATIVO',
               imagem_perfil: req.body.url_imagem_perfil || '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: req.body.idioma,
               aplicaDesconto: req.body.aplicaDesconto || 'NÂO',
               desconto_max: req.body.desconto_max || 0,
               cpf: req.body.cpf,
               rg: req.body.rg || '',
               data_nascimento: req.body.data_nascimento,
               telefone: req.body.telefone,
               email: req.body.email,
               perfis: req.body.perfis || ["FILIACAO"],
               perfil_atual: req.body.perfil_atual,
               senha: senhaHash,
               pais: req.body.pais || '',
               estado: req.body.estado,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
               cep: req.body.cep,
               turmas: req.body.turmas || [],
               filhos: req.body.filhos || [],
               compras: req.body.compras || [],

          }

          await db.collection('usuarios').add(filiacao)
          var email = {
               nome: req.body.nome,
               email: req.body.email
          }

          await emailDeBoasVindas(email)

          res.status(201).json(`Usuário cadastrado com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar usuário!', e, res)
     }
}
//Cadastrar FILIAÇÃO Matricula
const cadastrarFiliacao_Matricula = async (aluno, filiacao) => {
     try {
          console.log('Entrou para salvar filiacao')
          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(filiacao.cpf, salt)//encriptamos a senha

          const responsavel = {
               id_instituicao: aluno.id_instituicao,
               id_escola: aluno.id_escola,
               nome: filiacao.nome,
               sobrenome: filiacao.sobrenome,
               status: 'ATIVO',
               imagem_perfil: '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: filiacao.idioma || 'PORTUGUÊS',
               aplicaDesconto: 'NÂO',
               desconto_max: 0,
               cpf: filiacao.cpf,
               rg: filiacao.rg || '',
               data_nascimento: filiacao.data_nascimento,
               telefone: filiacao.telefone,
               email: filiacao.email,
               perfis: ["FILIACAO"],
               perfil_atual: 'FILIACAO',
               senha: senhaHash,
               pais: filiacao.pais || '',
               estado: filiacao.estado,
               cidade:filiacao.cidade,
               bairro: filiacao.bairro,
               logradouro: filiacao.logradouro,
               numero: filiacao.numero,
               cep: filiacao.cep,
               turmas: [],
               filhos: filiacao.filhos,
               compras: [],

          }

          await db.collection('usuarios').add(responsavel)
          var email = {
               nome: filiacao.nome,
               email: filiacao.email
          }
          console.log('salvou filiacao')

          await emailDeBoasVindas(email)

          return

     } catch (e) {
          return e
     }
}

//Cadastrar ALUNO Matrícula
const cadastrarAluno_Matricula = async (aluno) => {
     try {
               
          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(aluno.cpf, salt)//encriptamos a senha

          const alu = {
               id_instituicao: aluno.id_instituicao,
               id_escola: aluno.id_escola,
               nome: aluno.nome,
               sobrenome: aluno.sobrenome,
               status: 'ATIVO',
               imagem_perfil: '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: aluno.idioma || 'PORTUGUÊS',
               aplicaDesconto: 'NÂO',
               desconto_max: 0,
               cpf: aluno.cpf,
               rg: aluno.rg || '',
               data_nascimento: aluno.data_nascimento,
               telefone: aluno.telefone,
               email: aluno.email,
               perfis: ["ALUNO"],
               perfil_atual: 'ALUNO',
               senha: senhaHash,
               pais: aluno.pais|| '',
               estado: aluno.estado,
               cidade:aluno.cidade,
               bairro: aluno.bairro || '',
               logradouro: aluno.logradouro,
               numero: aluno.numero,
               cep: aluno.cep,
               turmas: aluno.turmas,
               filiacoes: [],
               compras: [],
          }

          const alunoMatriculado = await db.collection('usuarios').add(alu)
          var email = {
               nome: aluno.nome,
               email: aluno.email
          }

          await emailDeBoasVindas(email)

          return alunoMatriculado

     } catch (e) {
          return e
     }
}
//Cadastrar ALUNO
exports.cadastrarAluno = async (req, res, next) => {
     try {

          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(req.body.cpf, salt)//encriptamos a senha

          const aluno = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               nome: req.body.nome,
               sobrenome: req.body.sobrenome,
               status: req.body.status || 'ATIVO',
               imagem_perfil: req.body.url_imagem_perfil || '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: req.body.idioma,
               aplicaDesconto: req.body.aplicaDesconto || 'NÂO',
               desconto_max: req.body.desconto_max || 0,
               cpf: req.body.cpf || '',
               rg: req.body.rg || '',
               data_nascimento: req.body.data_nascimento,
               telefone: req.body.telefone,
               email: req.body.email,
               perfis: req.body.perfis || ["ALUNO"],
               perfil_atual: req.body.perfil_atual || 'ALUNO',
               senha: senhaHash,
               pais: req.body.pais,
               estado: req.body.estado,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
               cep: req.body.cep,
               turmas: req.body.turmas || [],
               filiacoes: req.body.filiacoes || [],
               compras: req.body.compras || [],
          }

          await db.collection('usuarios').add(aluno)
          var email = {
               nome: req.body.nome,
               email: req.body.email
          }

          await emailDeBoasVindas(email)

          res.status(201).json(`Usuário cadastrado com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar usuário!', e, res)
     }
}


exports.cadastrarRecepcionista = async (req, res, next) => {
     try {
          const salt = bcrypt.genSaltSync()
          const senhaHash = bcrypt.hashSync(req.body.cpf, salt)//encriptamos a senha

          const recepcionista = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               nome: req.body.nome,
               sobrenome: req.body.sobrenome,
               status: req.body.status || 'ATIVO',
               imagem_perfil: req.body.url_imagem_perfil || '',
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               idioma: req.body.idioma,
               aplicaDesconto: req.body.aplicaDesconto || 'NÂO',
               desconto_max: req.body.desconto_max || 0,
               cpf: req.body.cpf,
               rg: req.body.rg || '',
               data_nascimento: req.body.data_nascimento,
               telefone: req.body.telefone,
               email: req.body.email,
               perfis: req.body.perfis || ["RECEPCIONISTA"],
               perfil_atual: req.body.perfil_atual,
               senha: senhaHash,
               pais: req.body.pais,
               estado: req.body.estado,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
               cep: req.body.cep,
               compras: req.body.compras || [],
          }

          await db.collection('usuarios').add(recepcionista)
          var email = {
               nome: req.body.nome,
               email: req.body.email
          }

          await emailDeBoasVindas(email)

          res.status(201).json(`Usuário cadastrado com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar usuário!', e, res)
     }
}

//Buscar todos os usuarios da plataforma so Valor
exports.buscarTodosUsuariosSoValor = async function (req, res, next) {
     try {
          db.collection('usuarios').get()
               .then(docs => {
                    console.log(docs.size)

                    res.status(200).json(parseInt(docs.size))
               })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuários!', e, res)
     }
}

//Buscar todos os usuarios da plataforma
exports.buscarTodosUsuarios = async function (req, res, next) {
     try {
          var buscar = ''
          if (req.body.status && req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('status', '==', `${req.body.status}`)
                    .where('perfis', 'array-contains', `${req.body.perfil}`)

          } else if (req.body.status && !req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('status', '==', `${req.body.status}`)
          } else if (!req.body.status && req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('perfis', 'array-contains', `${req.body.perfil}`)
          } else {
               buscar = await db.collection('usuarios')
          }

          buscar.get()
               .then(docs => {
                    var usuarios = [];
                    docs.forEach(doc => {
                         var usuario = { id: doc.id, ...doc.data() }
                         delete usuario.senha
                         usuarios.push(usuario)
                    });

                    return res.status(200).json(usuarios)

               }).catch(err => { return err })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuários!', e, res)
     }
}




//Buscar todos os usuarios da instituição so Valor
exports.buscarTodosUsuariosInstituicaoSoValor = async function (req, res, next) {
     try {
          db.collection('usuarios')
               .where('id_instituicao', '==', req.params.id_instituicao)
               .get()
               .then(docs => {
                    console.log(docs.size)
                    res.status(200).json(parseInt(docs.size))
               })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuários!', e, res)
     }
}


//Buscar todos os usuarios da instituição
exports.buscarTodosUsuariosInstituicao = async function (req, res, next) {
     try {
          var buscar = ''

          if (req.body.status && req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('id_instituicao', '==', `${req.params.id_instituicao}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('perfis', 'array-contains', `${req.body.perfil}`)

          } else if (req.body.status && !req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('id_instituicao', '==', `${req.params.id_instituicao}`)
                    .where('status', '==', `${req.body.status}`)

          } else if (!req.body.status && req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('id_instituicao', '==', `${req.params.id_instituicao}`)
                    .where('perfis', 'array-contains', `${req.body.perfil}`)
          } else {
               buscar = await db.collection('usuarios')
                    .where('id_instituicao', '==', `${req.params.id_instituicao}`)

          }
          buscar.get()
               .then(docs => {
                    var usuarios = [];
                    docs.forEach(doc => {
                         var usuario = { id: doc.id, ...doc.data() }
                         delete usuario.senha
                         usuarios.push(usuario)
                    });
                    return res.status(200).json(usuarios)
               }).catch(err => { return err })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuários!', e, res)
     }
}



//Buscar todos os usuarios da Escola so Valor
exports.buscarTodosUsuariosEscolaSoValor = async function (req, res, next) {
     try {
          db.collection('usuarios')
               .where('id_instituicao', '==', `${req.params.id_instituicao}`)
               .where('id_escola', '==', `${req.params.id_escola}`)
               .get()
               .then(docs => {
                    console.log(docs.size)
                    res.status(200).json(parseInt(docs.size))
               })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuários!', e, res)
     }
}

//Buscar todos os usuarios da Escola
exports.buscarTodosUsuariosEscola = async function (req, res, next) {
     try {
          var buscar = ''

          if (req.body.status && req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('perfis', 'array-contains', `${req.body.perfil}`)

          } else if (req.body.status && !req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('status', '==', `${req.body.status}`)

          } else if (!req.body.status && req.body.perfil) {
               buscar = await db.collection('usuarios')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('perfis', 'array-contains', `${req.body.perfil}`)
          } else {
               buscar = await db.collection('usuarios')
                    .where('id_escola', '==', `${req.params.id_escola}`)

          }
          buscar.get()
               .then(docs => {
                    var usuarios = [];
                    docs.forEach(doc => {
                         var usuario = { id: doc.id, ...doc.data() }
                         delete usuario.senha
                         usuarios.push(usuario)
                    });
                    return res.status(200).json(usuarios)
               }).catch(err => { return err })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuários!', e, res)
     }
}


//BUscar usuário por id
exports.buscarUsuarioPorID = async function (req, res, next) {
     try {
          const buscarUsuario = await db.collection('usuarios').doc(`${req.params.id_usuario}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         res.status(404).json('Usuários não encontrado!');
                    } else {
                         var usuario = { id: doc.id, ...doc.data() }
                         delete usuario.senha

                         res.status(200).json(usuario);
                    }
               }).catch(err => { return err })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuário!', e, res)
     }
}
//BUscar usuário por email ou cpf
exports.buscarUsuarioPorEmail_CPF = async function (req, res, next) {
     try {
          var buscarUsuario = ''
          if (req.body.tipo_busca === 'EMAIL') {
               buscarUsuario = await db.collection('usuarios').where('email', '==', `${req.body.email}`).get()
          } else {
               buscarUsuario = await db.collection('usuarios').where('cpf', '==', `${req.body.cpf}`).get()
          }
          if (buscarUsuario.docs < 1) {
               throw 'Usuário não encontrado!'
               next
          } else {
               buscarUsuario.forEach(doc => {
                    var user = { id: doc.id, ...doc.data() }
                    delete user.senha
                    res.status(200).json(user);
               })

          }


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuário!', e, res)
     }
}

//Atualizar usuário
exports.atualizarUsuario = async function (req, res) {
     try {
          req.body.ultima_atualizacao = dataAtual

          var setDoc = await db.collection('usuarios').doc(`${req.params.id_usuario}`).update(req.body);
          return res.status(201).json(`Usuário atualizado com sucesso`)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuário!', e, res)
     }
}


//Deletar usuário
exports.deletarUsuario = async function (req, res, next) {
     try {
          req.body.ultima_atualizacao = dataAtual

          var setDoc = await db.collection('usuarios').doc(`${req.params.id_usuario}`).delete()
          return res.status(201).json(`Usuário deletado com sucesso`)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar usuário!', e, res)
     }
};