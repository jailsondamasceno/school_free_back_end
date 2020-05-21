const db = require('../../config/firestore');

//ategorias----------------------------------------------------------------
//Cadastrar Categoria
exports.cadastrarCategoria = async (req, res, netx) => {
     try {
          const categoria = {
               id_instituicao: req.params.id_instituicao,
               nome: req.body.nome
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('categorias_receitas').add(categoria);

          return res.status(201).json(`Categoria criada com sucesso!`)

     } catch (e) {
          res.status(500).json(e)
     }
}

//Buscar todoas as Categorias 
exports.buscarCategorias = async function (req, res, next) {
     try{
     const discRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('categorias_receitas').get()
          .then(snapshot => {
               var categorias = [];
               snapshot.forEach(doc => {
                    const categoria = {
                         id: doc.id,
                         id_instituicao: doc.data().id_instituicao,
                         nome: doc.data().nome
                         
                    };
                    categorias.push(categoria)
               });
               return res.status(200).json(categorias)
          })
          .catch(err => {
               return res.status(400).json(err);
          });
     }catch(e){
          res.status(404).json('Nenhuma categoria encontrada!')
     }
}


//Buscar Categoria  por Id 
exports.buscarCategoriaPorID = async function (req, res, next) {
     const discRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('categorias_receitas').doc(`${req.params.id_categoria}`);
     discRef.get()
          .then(doc => {
               if (!doc.exists) {
                    res.json('Categoria não encontrada!');
               } else {

                    const categoria = {
                         id: doc.id,
                         id_instituicao: doc.data().id_instituicao,
                         nome: doc.data().nome                    

                    };
                    res.status(200).json(categoria);
               }
          })
          .catch(err => {
               res.status(500).json('Erro ao buscar a categoria!', err);
          });
}

/* //Buscar Categoria  por Tipo 
exports.buscarCategoriasPorTipo = async function (req, res, next) {
     const discRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('categorias_receitas')
          .where('tipo','==',`${req.body.tipo}`).get()
          .then(docs => {
               if (!docs) {
                    res.status(404).json('Nenhuma categoria  encontrada!');
               } else {
                   const categorias = [];
                    docs.forEach(doc =>{
                         const categoria = {
                              id: doc.id,
                              id_instituicao: doc.data().id_instituicao,
                              nome: doc.data().nome
                             
                         };
                         categorias.push(categoria)

                    })
                 
                    res.status(200).json(categorias);
               }
          })
          .catch(err => {
               res.status(500).json('Erro ao buscar a categorias!', err);
          });
}
 */


//Atualiza uma Categoria 

exports.atualizarCategoria = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('categorias_receitas').doc(`${req.params.id_categoria}`).update(req.body)

          res.status(202).json('Categoria atualizada com sucesso!')

     } catch (e) { `Não foi possível atualizar! ${e}` }
}


//Deletar uma Categoria

exports.deletarCategoria = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('categorias_receitas').doc(`${req.params.id_categoria}`).delete()

          res.status(202).json('Categoria deletada com sucesso!')

     } catch (e) {
          res.status(400).json(`Erro ao deletar a categoria! ${e}`)
     }

}

//Subcategorias-----------------------------------------------------------------------

//Cadastrar Subcategoria
exports.cadastrarSubcategoria = async (req, res, next) => {
     try {
          const subcategoria = {
               id_categoria: req.params.id_categoria,
               nome: req.body.nome               
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('categorias_receitas').doc(`${req.params.id_categoria}`)
               .collection('subcategorias').add(subcategoria);

          return res.status(201).json(`Subcategoria criada com sucesso!`)

     } catch (e) {
          res.status(500).json(e)
     }
}

//Buscar todas as Subcategorias 
exports.buscarSubcategorias = async function (req, res, next) {
     try{
     const discRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('categorias_receitas').doc(`${req.params.id_categoria}`)
          .collection('subcategorias').get()
          .then(docs => {
               const subcategorias = [];
               docs.forEach(doc => {
                    const subcategoria = {
                         id: doc.id,
                         ...doc.data()
                    };
                    subcategorias.push(subcategoria)
               });
               return res.status(200).json(subcategorias)
          })
          .catch(err => {
               return res.status(400).json(err);
          });
     }catch(e){
          res.status(404).json('Nenhuma subcategoria encontrada!')
     }
}


//Buscar Subcategoria  por Id 
exports.buscarSubcategoriaPorID = async function (req, res, next) {
     const discRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('categorias_receitas').doc(`${req.params.id_categoria}`)
          .collection('subcategorias').doc(`${req.params.id_subcategoria}`)
     discRef.get()
          .then(doc => {
               if (!doc.exists) {
                    res.json('Subcategoria não encontrada!');
               } else {

                    const categoria = {
                         id: doc.id,
                         id_categoria: doc.data().id_categoria,
                         nome: doc.data().nome

                    };
                    res.status(200).json(categoria);
               }
          })
          .catch(err => {
               res.status(500).json('Erro ao buscar a subcategoria!', err);
          });
}



//Atualiza uma Subcategorias 

exports.atualizarSubcategoria = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('categorias_receitas').doc(`${req.params.id_categoria}`)
               .collection('subcategorias').doc(`${req.params.id_subcategoria}`).update(req.body)

          res.status(202).json('Subcategoria atualizada com sucesso!')

     } catch (e) { `Não foi possível atualizar! ${e}` }
}


//Deletar uma Subcategoria

exports.deletarSubcategoria = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('categorias_receitas').doc(`${req.params.id_categoria}`)
               .collection('subcategorias').doc(`${req.params.id_subcategoria}`).delete()

          res.status(202).json('Subcategoria deletada com sucesso!')

     } catch (e) {
          res.status(400).json(`Erro ao deletar a subcategoria! ${e}`)
     }

}