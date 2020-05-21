const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')


const dataAtual = momento.moment().format('DD/MM/YYYY')

//Cadastrar Escola
exports.cadastrarTurma = async (req, res, next) => {
     try {
          const turma = {
               id_escola: req.body.id_escola,
               id_curso: req.body.id_curso,
               nome: req.body.nome,
               descricao: req.body.descricao,
               total_de_vagas: req.body.total_de_vagas,
               vagas_disponiveis: req.body.vagas_disponiveis,
               data_inicio: req.body.data_inicio,
               data_fim: req.body.data_fim,
               turno: req.body.turno,
               status_turma: req.body.status_turma || 'ABERTA',
               ultima_atualizacao: dataAtual

          };
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('turmas').add(turma);
          return res.status(201).json(`Turma criada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao criar curso!', e, res)
     }
}

//Buscar todas as Turmas de uma instituicão
exports.buscarTurmas = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('turmas').orderBy('data_inicio').get()
               .then(snapshot => {
                    if (!snapshot) {
                         res.status(404).json('Nenhuma turma encontrada');
                    } else {
                         var turmas = [];
                         snapshot.forEach(doc => {
                              const turma = {
                                   id: doc.id,
                                   ...doc.data()
                              };
                              turmas.push(turma)

                         });
                    }
                    return res.status(200).json(turmas)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}

//Buscar Turmas Abertas da Insituição so valor
exports.buscarTurmasAbertasInstituicaoSoValor = async (req,res,next)=>{
     try{
     db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
     .collection('turmas')
     .where('status_turma','==','ABERTA').get()
     .then(docs=>{
          res.status(200).json(parseInt(docs.size))
     })
     
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}

//Buscar todas as Turmas de um curso
exports.buscarTurmasCurso = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('turmas').where('id_curso', '==', `${req.params.id_curso}`).orderBy('data_inicio').get()
               .then(snapshot => {
                    if (!snapshot) {
                         res.status(404).json('Nenhuma turma encontrada');
                    } else {
                         var turmas = [];
                         snapshot.forEach(doc => {
                              const turma = {
                                   id: doc.id,
                                   ...doc.data()
                              };
                              turmas.push(turma)

                         });
                    }
                    return res.status(200).json(turmas)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}
//Buscar todas as Turmas de um curso
exports.buscarTurmasCursoEscola = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('turmas')
               .where('id_escola', '==', `${req.params.id_escola}`)
               .where('id_curso', '==', `${req.params.id_curso}`).orderBy('data_inicio').get()
               .then(snapshot => {
                    if (!snapshot) {
                         res.status(404).json('Nenhuma turma encontrada');
                    } else {
                         var turmas = [];
                         snapshot.forEach(doc => {
                              const turma = {
                                   id: doc.id,
                                   ...doc.data()
                              };
                              turmas.push(turma)

                         });
                    }
                    return res.status(200).json(turmas)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}

//Buscar todas as Turmas de uma escolas
exports.buscarTurmasEscola = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('turmas')
               .where('id_escola', '==', `${req.params.id_escola}`).orderBy('data_inicio').get()
               .then(snapshot => {
                    if (!snapshot) {
                         res.status(404).json('Nenhuma turma encontrada');
                    } else {
                         var turmas = [];
                         snapshot.forEach(doc => {
                              const turma = {
                                   id: doc.id,
                                   ...doc.data()
                              };
                              turmas.push(turma)

                         });
                    }
                    return res.status(200).json(turmas)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turmas!', e, res)
     }
}




//Buscar Escola  por Id 
exports.buscarTurmaPorID = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('turmas').doc(`${req.params.id_turma}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         res.json('Turma não encontrada!');
                    } else {
                         const turma = {
                              id: doc.id,
                              ...doc.data()
                         };
                         return res.status(200).json(turma)
                    }

               }).catch(err => { return err });
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar turma!', e, res)
     }
}

//Atualizar instituição
exports.atualizarTurma = async (req, res, next) => {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('turmas').doc(`${req.params.id_turma}`).update(req.body);

          return res.status(201).json(`Turma atualizada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar turma!', e, res)
     }


}

//Buscar todos os ALUNOS de uma Turma
exports.alunosPorTurma = async (req, res, next) => {  //O tratamento de erro dessa funcção já foi testado
     try {
          const alunos = [];          
          await db.collection('usuarios')
               .where('turmas', 'array-contains', `${req.params.id_turma}`).get()
               .then(docs => {
                    if (docs.size < 1) {
                         res.status(404).json('Nenhum aluno encontrado')
                    } else {
                         const usuarios = []
                         docs.forEach(doc => {
                              const user = { id: doc.id, ...doc.data() }
                              usuarios.push(user)

                         })   
                         
                         for (var i = 0; i < usuarios.length; i++) {
                              const perfis = usuarios[i].perfis
                              for (var j=0;j<perfis.length;j++) {
                                   if (perfis[j] === 'ALUNO') {
                                        const aluno = {...usuarios[i]}                              
                                        delete aluno.senha
                                        alunos.push(aluno)
                                   }
          
                              }                             
          
                         }
                         res.status(200).json(alunos)
                         
                    }
                    

               })           

     } catch (e) {
          return pegaErros.manipulaErros(' Erro ao buscar alunos !', e, res)
     }
}
//Buscar todos os PROFESSORES  de uma Turma
exports.professoresPorTurma = async (req, res, next) => {  //O tratamento de erro dessa funcção já foi testado
     try {
          const professores = [];
          await db.collection('usuarios')
               .where('turmas', 'array-contains', `${req.params.id_turma}`).get()
               .then(docs => {
                    if (docs.size < 1) {
                         res.status(404).json('Nenhum professor encontrado')
                    } else {
                         const usuarios = []
                         docs.forEach(doc => {
                              const user = { id: doc.id, ...doc.data() }
                              usuarios.push(user)

                         })

                         for (var i = 0; i < usuarios.length; i++) {
                              const perfis = usuarios[i].perfis
                              for (var j=0;j<perfis.length;j++) {
                                   if (perfis[j] === 'PROFESSOR') {
                                        const professor = {...usuarios[i]}
                                        delete professor.senha
                                        professores.push(professor)
                                   }

                              }

                         }

                         res.status(200).json(professores)
                    }

               })




     } catch (e) {
          return pegaErros.manipulaErros(' Erro ao buscar professores !', e, res)
     }
}