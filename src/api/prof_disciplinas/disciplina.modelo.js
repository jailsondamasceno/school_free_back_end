const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');


//Cadastrar Disciplina
exports.cadastrarDisciplina = async (req, res) => {
     try {
          const disciplina = {
               id_curso: req.body.id_curso,
               nome: req.body.nome,
               carga_horaria: req.body.carga_horaria,
               professores: req.body.professores || []
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('disciplinas').add(disciplina);

          return res.status(201).json(`Disciplina criada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar disciplinas!', e, res)
     }
}

//Buscar todoas as Disciplinas 
exports.buscarDisciplinasCurso = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('disciplinas').where('id_curso','==',`${req.params.id_curso}`).get()                            
               .then(docs => {
                    var disciplinas = [];
                    docs.forEach(doc => {
                         const disciplina = {
                              id: doc.id,
                              ...doc.data()
                         };
                         disciplinas.push(disciplina)
                    });
                    return res.status(200).json(disciplinas)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar disciplinas!', e, res)
     }
}
//Buscar Todos os Professores da Instituição 
exports.professoresInstituicao = async function (req, res, next) {
     try {
          const professores = [];
          await db.collection('usuarios').where('perfis','array-contains','PROFESSOR').get()                            
               .then(docs => {                   
                    docs.forEach(doc => {
                         const professor = {
                              id: doc.id,
                              ...doc.data()
                         };
                         delete professor.senha
                         professores.push(professor)
                    });
                    return res.status(200).json(professores)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro buscar professores!', e, res)
     }
}
//Buscar Todos os Professores da Escola 
exports.professoresEscola = async function (req, res, next) {
     try {
          const professores = [];
          await db.collection('usuarios')
         .where('perfis','array-contains','PROFESSOR')
         .where('id_escola','==',`${req.params.id_escola}`).get()                     
               .then(docs => {
                   
                    docs.forEach(doc => {
                         const professor = {
                              id: doc.id,
                              ...doc.data()                              
                         };
                         delete professor.senha
                         professores.push(professor)
                    });
                    return res.status(200).json(professores)
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro buscar professores!', e, res)
     }
}
//Buscar Todos os Professores da Escola 
exports.professoresTurma = async function (req, res, next) {
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


//Buscar Disciplina  por Id 
exports.buscarDisciplinaPorID = async function (req, res, next) {
     try {
           await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('disciplinas').doc(`${req.params.id_disciplina}`).get()
               .then(doc => {
                    if (!doc) {
                         res.status(404).json('Disciplina não encontrado!');
                    } else {

                         const disciplina = {
                              id: doc.id,
                              ...doc.data()
                         };
                         res.status(200).json(disciplina);
                    }
               }).catch(err => { return err });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar disciplina!', e, res)
     }
}



//Busca  Disciplina  por professor
exports.buscarDisciplinasPorProf = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('disciplinas')
               .where('professores', 'array-contains', `${req.params.id_professor}`).get()
               .then(docs => {

                    const disciplinas = [];
                    docs.forEach(doc => {
                         var disciplina = {
                              id: doc.id,
                              ...doc.data()
                         }
                         disciplinas.push(disciplina)

                    })

                    res.status(200).json(disciplinas)
               }).catch(err => { return err });


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar disciplina!', e, res)
     }
}
//Busca  PROFESSORES  por disciplina
exports.buscarProfsPorDisciplina = async (req, res, next) => {
     try {
          const professores = [];
          await db.collection('usuarios')
               .where('disciplinas', 'array-contains', `${req.params.id_disciplina}`).get()
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

//Atualiza uma Disciplina 

exports.atualizarDisciplina = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('disciplinas').doc(`${req.params.id_disciplina}`).update(req.body)

          res.status(202).json('Disciplina atualizada com sucesso!')

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar disciplina!', e, res)
     }
}


//Deletar uma Disciplina

exports.deletarDisciplina = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('disciplinas').doc(`${req.params.id_disciplina}`).delete()

          res.status(202).json('Disciplina deletada com sucesso!')

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar disciplina!', e, res)
     }

}

