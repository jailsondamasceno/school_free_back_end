const db = require('../../config/firestore');

//Cadastrar Produto ou Serviço
exports.cadastrarProd_Servico = async (req, res, next) => {
     try {
          const prod_servico = {
               id_instituicao: req.body.id_instituicao,
               nome: req.body.nome,
               descricao: req.body.descricao,
               tipo: req.body.tipo,
               url_imagem: req.body.url_imagem || '',
               id_categoria: req.body.id_categoria,
               id_subcategoria: req.body.id_subcategoria || '',
               valor: req.body.valor || 0,
               para_escolas: req.body.para_escolas || [],
               aparecer_na_loja: req.body.aparecer_na_loja,
               aceita_desconto: req.body.aceita_desconto || 'NÃO',

          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').add(prod_servico);
          res.status(201).json(`Cadastrado com sucesso!`)

     } catch (e) {
          res.status(400).json('Erro ao salvar!')
     }
}

//Buscar todas os Pordutos ou Serviços 
exports.buscarProd_Servicos = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('produtos_servicos').get()
               .then(docs => {
                    if (docs.empty) {
                         res.status(404).json('Nenhum Produto ou Serviço encontrado!')
                    } else {
                         var prod_servicos = [];
                         docs.forEach(doc => {
                              const prod_serv = {
                                   id: doc.id,
                                   ...doc.data()

                              };
                              delete prod_serv.url_imagem
                              delete prod_serv.descricao
                              prod_servicos.push(prod_serv)
                         });
                         res.status(200).json(prod_servicos)
                    }
               })

     } catch (e) {
          res.status(400).json('Erro ao buscar Pordutos ou Serviços!')
     }
}

//Buscar todas os Produto ou Serviço de uma escola 
exports.buscarProd_Serv_por_Escola = async function (req, res, next) {
     try {
          const prod_servicos =[]
          const prod_serv = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('produtos_servicos').where('para_escolas','array-contains',`${req.body.id_escola}`).get()

          prod_serv.forEach(doc=>{
               const prod ={
                    id:doc.id,
                    ...doc.data()
               }
               prod_servicos.push(prod)
          })
          Promise.all(prod_servicos)

          res.status(200).json(prod_servicos)

     } catch (e) {
          res.status(400).json('Erro ao buscar Pordutos ou Serviços!')
     }
}


//Buscar Produto Ou Serviço  por Id 
exports.buscarProd_ServicoPorID = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').doc(`${req.params.id_prod_serv}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         res.status(404).json('Produto ou Serviço não encontrado!');
                    } else {
                         const prod_servico = {
                              id: doc.id,
                              ...doc.data()
                         };
                         res.status(200).json(prod_servico);
                    }
               })

     } catch (e) {
          res.status(400).json('Erro ao buscar Produto ou serviço! ')
     }
}

//Atualizar instituição
exports.atualizarProd_Servico = async (req, res, next) => {
     try {

          db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').doc(`${req.params.id_prod_serv}`).update(req.body);

          res.status(201).json(`Atualizado com sucesso !`)

     } catch (e) {
          res.status(500).json('Erro ao atualizar !')
     }

}

//Deletar um Produto ou Serviço
exports.deletarProd_Servico = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').doc(`${req.params.id_prod_serv}`).delete()

          res.status(201).json(`Deletado com sucesso`)

     } catch (e) {
          res.status(400).json('Erro ao deletar!')
     }

}
