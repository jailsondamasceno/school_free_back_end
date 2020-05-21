const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')

const dataAtual = momento.moment().format('DD/MM/YYYY')

//Tipos duração
exports.tiposDuracao = async function (req, res, next) {
     try {
           await db.collection('tipos_duracao').get()
               .then(docs => {                    
                    docs.forEach(doc => {
                         return res.status(200).json(doc.data())
                    });
                    
               }).catch(err => { return err })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cursos!', e, res)
     }
}


//Cadastrar Curso
exports.cadastrarCurso = async (req, res, next) => {
     try {
          const curso = {
               id_instituicao: req.body.id_instituicao,
               para_escolas: req.body.para_escolas ||[],
               ultima_atualizacao: dataAtual,
               nome: req.body.nome,
               descricao: req.body.descricao,
               duracao: req.body.duracao,
               tipo_duracao: req.body.tipo_duracao,
               url_imagem: req.body.url_imagem ||'',
               status_curso: req.body.status_curso || 'ATIVO'
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('cursos').add(curso);
          return res.status(201).json(`Curso criado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar curso!', e, res)
     }
}


//Buscar os Cursos da instituição
exports.buscarCursosInstituicao = async function (req, res, next) {
     try {        
          const cursos = []          
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('cursos').get()
               .then(docs => {                    
                    docs.forEach(doc => {
                         const curso = {
                              id: doc.id,
                              ...doc.data()
                         };
                         cursos.push(curso)                         
                    });

                    return res.status(200).json(cursos)                                               
               }).catch(err => { return err })             
               
                              
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cursos!', e, res)
     }
}
//Buscar os Cursos de uma escola
exports.buscarCursosEscola = async function (req, res, next) {
     try {

           await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('cursos').where('para_escolas','array-contains',`${req.params.id_escola}`).get()
               .then(docs => {
                    var cursos = [];
                    docs.forEach(doc => {
                         const curso = {
                              id: doc.id,
                              ...doc.data()
                         };
                         cursos.push(curso)
                    });
                    return res.status(200).json(cursos)
               }).catch(err => { return err })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar cursos!', e, res)
     }
}



//Buscar Curso  por Id 
exports.buscarCursoPorID = async function (req, res, next) {
     try {
           await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('cursos').doc(`${req.params.id_curso}`).get()             
               .then(doc => {
                    if (!doc.exists) {
                         res.json('Curso não encontrado!');
                    } else {
                         const curso = {
                              id: doc.id,
                              ...doc.data()
                         };
                         res.status(200).json(curso);
                    }
               }).catch(err => { return err })


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar curso!', e, res)
     }
}

//Atualizar curso
exports.atualizarCurso = async (req, res, next) => {
     try {
          req.body.ultima_atualizacao = dataAtual

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('cursos').doc(`${req.params.id_curso}`).update(req.body);

          return res.status(201).json(`Curso atualizado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar curso!', e, res)
     }

}


//Deeltar curso
exports.deletarCurso = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('cursos').doc(`${req.params.id_curso}`).delete()

          return res.status(201).json(`Curso deletado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar curso!', e, res)
     }

}