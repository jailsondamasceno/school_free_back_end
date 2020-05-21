const db = require('../../config/firestore');
const momento = require('../../utilidades/moment')
const pegaErros = require('../../utilidades/manipulaErro');

//Cadastrar Horário
exports.cadastrarHorario = async (req, res, next) => {
     try {
          const horario = {
               id_turma: req.body.id_turma,
               dia: req.body.dia,
               disciplina: req.body.disciplina,
               id_professor:req.body.id_professor,
               hora_inicio: req.body.hora_inicio,
               hora_fim: req.body.hora_fim          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('horarios').add(horario);
          return res.status(201).json(`Horário criado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao salvar!', e, res)
     }
}

//Buscar todos os horáris da Turma
exports.horariosPorTurma = async function (req, res, next) {
     try {
          var horarios = [];
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('horarios').where('id_turma','==',`${req.params.id_turma}`).get()
               .then(docs => {
                    if (docs.size <1) {
                         throw 'Nenhum horário encontrado!'
                    } else {
                         docs.forEach(doc => {
                              const horario = {
                                   id: doc.id,
                                  ...doc.data()
                              };
                              horarios.push(horario)


                         })


                    }

               })


               
          //Depois que pegamos todas os horários, percorremos todos os horários

          for (var i = 0; i < horarios.length; i++) {

               await db.collection('usuarios').doc(`${horarios[i].id_professor}`).get()
                    .then(doc => {
                         horarios[i].professor = doc.data().nome || '' // Então pegamos o id do professor e buscamos entre os usuarios
                    })                                            // E subtituimos o id_professor pelo nome da coleção de usuáriso
          }

          return res.status(200).json(horarios)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar horários!', e, res)
     }

}



//Buscar todos os horáris por Professor
exports.horariosPorProf = async function (req, res, next) {
     try {
          var horarios = [];
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('horarios').where('id_professor','==',`${req.params.id_professor}`).get()
               .then(docs => {
                    if (docs.size <1) {
                         throw 'Nenhum horário encontrado!'
                    } else {
                         docs.forEach(doc => {
                              const horario = {
                                   id: doc.id,
                                  ...doc.data()
                              };
                              horarios.push(horario)


                         })


                    }

               })


               
          //Depois que pegamos todas os horários, percorremos todos os horários

          for (var i = 0; i < horarios.length; i++) {

               await db.collection('usuarios').doc(`${horarios[i].id_professor}`).get()
                    .then(user => {
                         horarios[i].id_professor = user.data().nome // Então pegamos o id do professor e buscamos entre os usuarios
                    })                                            // E subtituimos o id_professor pelo nome da coleção de usuáriso
          }

          return res.status(200).json(horarios)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar horários!', e, res)
     }

}


//Buscar todos os horáris por Dia da semana
exports.horariosPorDiaDaSemana = async function (req, res, next) {
     try {
          var horarios = [];
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('horarios')
               .where('id_turma','==',`${req.params.id_turma}`)
               .where('dia','==',`${req.params.dia}`).get()
               .then(docs => {
                    if (docs.size <1) {
                       throw 'Nenhum horário encontrado!'
                    } else {
                         docs.forEach(doc => {
                              const horario = {
                                   id: doc.id,
                                  ...doc.data()
                              };
                              horarios.push(horario)


                         })


                    }

               })


               
          //Depois que pegamos todas os horários, percorremos todos os horários

          for (var i = 0; i < horarios.length; i++) {

               await db.collection('usuarios').doc(`${horarios[i].id_professor}`).get()
                    .then(user => {
                         horarios[i].id_professor = user.data().nome // Então pegamos o id do professor e buscamos entre os usuarios
                    })                                            // E subtituimos o id_professor pelo nome da coleção de usuáriso
          }

          return res.status(200).json(horarios)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar horários!', e, res)
     }

}



//Buscar Horário  por Id 
exports.buscarHorarioPorID = async function (req, res, next) {
     try {

          var horario = {}
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)            
               .collection('horarios').doc(`${req.params.id_horario}`).get()
               .then(doc => {
                    if (!doc) {
                         throw 'Nenhum horário encontrado!'
                    } else {
                         horario= {id:doc.id,...doc.data()}                            
                    }
               })

               // Então pegamos o id do professor e buscamos entre os usuarios para pegar o nome
               await db.collection('usuarios').doc(`${horario.id_professor}`).get()
               .then(user => {
                    horario.id_professor = user.data().nome  // Entao substituimos o nome
               })   


               res.status(200).json(horario)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar horário!', e, res)
     }
}

//Atualizar um horário
exports.atualizarHorario = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('horarios').doc(`${req.params.id_horario}`).update(req.body);

          res.status(201).json(`Horário atualizado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar horário!', e, res)
     }


}

//Deletar Horário
exports.deletarHorario = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('horarios').doc(`${req.params.id_horario}`).delete()

          res.status(201).json(`Horário deletado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros(' Erro ao deletar  horário!', e, res)
     }

}



