const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');

//Cadastrar Produto ou Serviço
exports.cadastrarProd_Servico = async (req, res, next) => {
     try {
          const prod_servico = {
               id_instituicao: req.body.id_instituicao,
               nome: req.body.nome,
               tipo: req.body.tipo,
               url_imagem: req.body.url_imagem || '',
               id_categoria: req.body.categoria || '',
               id_subcategoria: req.body.subcategoria,
               valor: req.body.valor || 0,
               aparecer_na_loja: req.body.aparer_na_loja,
               aceita_desconto: req.body.aceita_desconto || 'NÃO',

          };

          await db.collection('instituicoes').doc(`${req.body.id_instituicao}`).collection('produtos_servicos').add(prod_servico);
          res.status(201).json(`Cadastrado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao salvar ', e, res)
     }
}

//Buscar todas os Pordutos ou Serviços insituicao
exports.buscarProd_Servicos = async function (req, res, next) {
     try {
          const prod = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').where('aparecer_na_loja', '==', 'SIM').get()
          const prod_servicos = [];
          prod.forEach(doc => {
               const prod_serv = {
                    id: doc.id,
                    ...doc.data()

               };

               delete prod_serv.descricao
               prod_servicos.push(prod_serv)                          

          })
          Promise.all(prod_servicos).catch(()=>{return err})
                    
          return res.status(200).json(prod_servicos)

     } catch (e) {
           pegaErros.manipulaErros('Erro ao buscar produtos!', e, res)
     }
}
//Buscar todas os Pordutos ou Serviços  escola
exports.buscarProd_ServicosEscola = async function (req, res, next) {
     try {
          const prod = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos')
               .where('aparecer_na_loja', '==', 'SIM')
               .where('para_escolas','array-contains',`${req.params.id_escola}`).get()
          const prod_servicos = [];
          prod.forEach(doc => {
               const prod_serv = {
                    id: doc.id,
                    ...doc.data()

               };

               delete prod_serv.descricao
               prod_servicos.push(prod_serv)                          

          })
          Promise.all(prod_servicos).catch(()=>{return err})
                    
          return res.status(200).json(prod_servicos)

     } catch (e) {
           pegaErros.manipulaErros('Erro ao buscar produtos!', e, res)
     }
}



//Buscar Produto Ou Serviço  por Id 
exports.buscarProd_ServicoPorID = async function (req, res, next) {
     try {
          const prod = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').doc(`${req.params.id_produto}`).get()

          const prod_servico = {
              id:prod.id,
              ...prod.data()
          }; 

          res.status(200).json(prod_servico);



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar produto!', e, res)
     }
}

//Atualizar instituição
exports.atualizarProd_Servico = async (req, res, next) => {
     try {

          db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').doc(`${req.params.id_prod_serv}`).update(req.body);

          res.status(200).json(`Atualizado com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar produto!', e, res)
     }

}

//Deletar um Produto ou Serviço
exports.deletarProd_Servico = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('produtos_servicos').doc(`${req.params.id_prod_serv}`).delete()

          res.status(201).json(`Deletado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar produto!', e, res)
     }

}
