const db = require('../../config/firestore');
const momento = require('../../utilidades/moment')
const pegaErros = require('../../utilidades/manipulaErro');

//Cadastrar Horário
exports.cadastrarAvaliacao = async (req, res, next) => {
     try {
          const avaliacao = {
               escola: req.body.escola,
               curso: req.body.curso,
               turma: req.body.turma,
               disciplina: req.body.disciplina,
               professor: req.body.professor,
               id_aluno: req.body.id_aluno,
               data: req.body.data,
               nota: req.body.nota
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('avaliacoes').add(avaliacao);

          res.status(201).json(`Avaliação criada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao salvar!', e, res)
     }
}

//Buscar todos os horáris da Turma
exports.buscarAvaliacoesPorAluno = async function (req, res, next) {
     try {

          var avaliacaos = [];

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('avaliacoes').where('id_aluno', '==', `${req.params.id_aluno}`).get()
               .then(docs => {
                    if (docs.empty) {
                         throw 'Nenhuma avaliacão encontrada!'
                    } else {

                         docs.forEach(doc => {

                              const avaliacao = {
                                   id:doc.id,
                                   escola: doc.data().escola,
                                   curso: doc.data().curso,
                                   turma: doc.data().turma,
                                   disciplina: doc.data().disciplina,
                                   professor: doc.data().professor,
                                   id_aluno: doc.data().id_aluno,
                                   data: doc.data().data,
                                   nota: doc.data().nota
                              };
                              avaliacaos.push(avaliacao)


                         })


                    }

               })                   

          return res.status(200).json(avaliacaos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar avaliações!', e, res)
     }

}



//Buscar Horário  por Id 
exports.buscarAvaliacaoPorID = async function (req, res, next) {
     try {

          const avaliacao = {}
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('avaliacoes').doc(`${req.params.id_avaliacao}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         throw'Nenhum avalição encontrada !'
                    } else {
                         avaliacao.id = doc.id,
                         avaliacao.escola = doc.data().escola,
                         avaliacao.curso = doc.data().curso,
                         avaliacao.turma = doc.data().turma,
                         avaliacao.disciplina = doc.data().disciplina,
                         avaliacao.professor = doc.data().professor,
                         avaliacao.id_aluno = doc.data().id_aluno,
                         avaliacao.data = doc.data().data,
                         avaliacao.nota = doc.data().nota
                    }
                    
               })
         
          res.status(200).json(avaliacao)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar avaliações!', e, res)
     }
}

//Atualizar um horário
exports.atualizarAvaliacao = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('avaliacoes').doc(`${req.params.id_avaliacao}`).update(req.body);

          res.status(201).json(`Avaliação atualizada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar horário!', e, res)
     }


}

//Deletar Horário
exports.deletarAvaliacao = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('avaliacoes').doc(`${req.params.id_avaliacao}`).delete()

          res.status(201).json(`Avaliação deletada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros(' Erro ao deletar  avaliação!', e, res)
     }

}



