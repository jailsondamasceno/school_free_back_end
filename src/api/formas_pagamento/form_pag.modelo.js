const db = require('../../config/firestore');
const pegarErros = require('../../utilidades/manipulaErro');


/* 
//Criar FormPag-----------
exports.criarFormPag = async (req, res, next) => {
     try {
          const FormPag = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               tipo: req.body.tipo,
               titulo: req.body.titulo,
               descricao: req.body.descricao,
               status: req.body.status || '',
               data_criacao: req.body.data_criacao
               //data_fechamento      
          };
          await db.collection('FormPag').add(FormPag);
          return res.status(201).json(`FormPag criado com sucesso!`)

     } catch (e) {
          res.status(400).json('Não foi possível criar o FormPag')
     }
}
 */
//Busca todos os FormPag 
exports.buscarFormPag = async function (req, res, next) {
     try {
          await db.collection('formas_de_pag').get()
               .then(docs => {
                    const formPags = [];
                    docs.forEach(doc => {
                         const FormPag = {
                              id: doc.id,
                              tipo: doc.data().tipo

                         };
                         formPags.push(FormPag)
                    });
                    res.status(200).json(formPags)
               })

     } catch (e) {
          pegarErros.manipulaErros('Erro ao buscar Formas de Pagamento', e, res)
     }
}


//Busca um unico FormPag
exports.buscarFormPagPorID = async function (req, res, next) {
     try {
          await db.collection('formas_de_pag').doc(`${req.params.id_FormPag}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         res.status(404).json('Forma de pagametno não encontrada!');
                    } else {
                         const FormPag = {
                              id: doc.id,
                              id_instituicao: doc.data().id_instituicao,
                              id_escola: doc.data().id_escola,
                              tipo: doc.data().tipo,
                              titulo: doc.data().titulo,
                              descricao: doc.data().descricao,
                              status: doc.data().status,
                              data_criacao: doc.data().data_criacao
                         };
                         res.status(200).json(FormPag);
                    }
               })
              
     } catch (e) {
          return pegarErros.manipulaErros('Erro ao buscar forma de pagamento',e,res)
     }
}




/* 
//Atualiza um FormPag de uma escola. 
exports.atualizarFormPag = async function (req, res, next) {
     try {
          await db.collection('FormPag').doc(`${req.params.id_FormPag}`).update(req.body);

          res.status(201).json(`FormPag atualizado com sucesso`)

     } catch (e) {
          res.status(400).json('Erro ao atualizar FormPag')
     }

}




exports.deletarFormPag = async function (req, res, next) {
     try {

          await db.collection('FormPag').doc(`${req.params.id_FormPag}`).delete()

          return res.status(201).json(`FormPag deletado com sucesso`)

     } catch (e) {
          res.status(400).json(e)
     }

}
 */

