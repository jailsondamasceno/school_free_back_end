const db = require('../../config/firestore')
const pegaErros = require('../../utilidades/manipulaErro');

//Buscar alunos e aplicando filtros
exports.buscarAlunos = async (req, res, next) => {

     try {

          if (req.body.id_escola && !req.body.id_curso && !req.body.id_turma) {
               const porEscola = await db.collection('usuarios');
               q1 = porEscola.where('perfis','array-contains' , 'ALUNO')
               q2 = q1.where('id_escola', '==', `${req.body.id_escola}`)
               q2.get()
                    .then(docs => {
                         const alunos = []
                         docs.forEach(doc => {
                              const aluno = {
                                   id: doc.id,
                                   nome: doc.data().nome,
                                   sobrenome: doc.data().sobrenome
                              }

                              alunos.push(aluno)
                         })

                         res.status(200).json(alunos)
                    })

          } else if (req.body.id_escola && req.body.id_curso && !req.body.id_turma) {
               const porCurso = await db.collection('usuarios');
               q1 = porCurso.where('perfis','array-contains' , 'ALUNO')
               q2 = q1.where('id_escola', '==', `${req.body.id_escola}`)
               q3 = q2.where('id_curso', '==', `${req.body.id_curso}`)
               q3.get()
                    .then(docs => {
                         const alunos = []
                         docs.forEach(doc => {
                              const aluno = {
                                   id: doc.id,
                                   nome: doc.data().nome,
                                   sobrenome: doc.data().sobrenome
                              }



                              alunos.push(aluno)
                         })

                         res.status(200).json(alunos)
                    })


          } else if (req.body.id_escola && req.body.id_curso && req.body.id_turma) {
               const porTurma = await db.collection('usuarios');
               q1 = porTurma.where('perfis','array-contains' , 'ALUNO')
               q2 = q1.where('id_escola', '==', `${req.body.id_escola}`)
               q3 = q2.where('id_curso', '==', `${req.body.id_curso}`)
               q4 = q3.where('id_turma', '==', `${req.body.id_turma}`)
               q4.get()
                    .then(docs => {
                         const alunos = []
                         docs.forEach(doc => {
                              const aluno = {
                                   id: doc.id,
                                   nome: doc.data().nome,
                                   sobrenome: doc.data().sobrenome
                              }



                              alunos.push(aluno)
                         })

                         res.status(200).json(alunos)
                    })



          } else {
               const todos = await db.collection('usuarios');
               todos.where('perfis','array-contains' , 'ALUNO').get()
                    .then(docs => {
                         const alunos = []
                         docs.forEach(doc => {
                              const aluno = {
                                   id: doc.id,
                                   nome: doc.data().nome,
                                   sobrenome: doc.data().sobrenome
                              }                              

                              alunos.push(aluno)
                         })

                         res.status(200).json(alunos)
                    })
          }



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar Alunos', e, res)
     }
}

//Buscar alunos da instituicao so valor 
exports.buscarAlunosDaInstituicaoSoValor = async (req, res, next) => {

     try {
          var quantAlunos = 0
          await db.collection('usuarios')
          .where('id_instituicao','==',`${req.params.id_instituicao}`)
          .where('perfis','array-contains','ALUNO').get()
          .then(docs=>{
              quantAlunos = docs.size
               res.status(200).json({quantAlunos})
          })

          
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar Alunos', e, res)
     }
}

//Buscar alunos por escola
exports.buscarAlunosPorEscola =async (req,res, next)=>{
     try{
          const alunos = []
          await db.collection('usuarios').where('id_escola','==',`${req.params.id_escola}`)
          .where('perfis','array-contains','ALUNO').get()
          .then(docs => {

               if(docs.empty){
                    throw 'Nenhum aluno encontrado!'
               }else{
               
               docs.forEach(doc => {
                    const aluno = {
                         id: doc.id,
                         nome: doc.data().nome,
                         sobrenome: doc.data().sobrenome,
                         email:doc.data().email
                    }

                   

                    alunos.push(aluno)
               })
          }
               res.status(200).json(alunos)
          })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar Alunos', e, res)
     }
}

//Buscar alunos por curso
exports.buscarAlunosPorCurso =async (req,res, next)=>{
     try{
          const alunos = []
          await db.collection('usuarios')
          .where('perfis','array-contains','ALUNO')
          .where('id_curso','==',`${req.params.id_curso}`).get()
          .then(docs => {

               if(docs.empty){
                    throw 'Nenhum aluno encontrado!'
               }else{
               
               docs.forEach(doc => {
                    const aluno = {
                         id: doc.id,
                         nome: doc.data().nome,
                         sobrenome: doc.data().sobrenome
                    }

                   

                    alunos.push(aluno)
               })
          }
               res.status(200).json(alunos)
          })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar Alunos', e, res)
     }
}

