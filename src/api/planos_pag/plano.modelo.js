const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const api_pagamento = require('../../../.env')
const Gerencianet = require('gn-api-sdk-node');

//contratação de planos
exports.contratarPlano = async (req, res, next) => {
     try {
          const options = {
               client_id: api_pagamento.api_pagamento.client_id_dev,
               client_secret: api_pagamento.api_pagamento.client_secret_dev,
               sandbox: true
          }

          var planBody = {
               name: 'My first plan',
               repeats: 24,
               interval: 2
          }

          var subscriptionBody = {
               items: [{
                    name: 'Product 1',
                    value: 1000,
                    amount: 2
               }]
          }
          var gerencianet = new Gerencianet(options);
          var createSubscription = function (response) {
               var params = {
                    id: response.data.plan_id
               }

               return gerencianet.createSubscription(params, subscriptionBody);
          }
          gerencianet
               .createPlan({}, planBody)
               .then(createSubscription)
               .then(result=>{
                    res.status(200).json(result)
               })
               .catch(console.log)
               .done();

          
         

     } catch (e) {
          pegaErros.manipulaErros('Erro ao contratar o plano', e, res)
     }
}
//Criar Plano de Pagamento para a platarforma
exports.criarPlano = async (req, res, next) => {
     try {
          const plano = {
               nome: req.body.nome,
               url_imagem: req.body.url_imagem,
               descricao: req.body.descricao,
               valor_anual: req.body.valor_anual,
               valor_mensal: req.body.valor_mensal,
               n_max_parcelas: req.body.n_max_parcelas,
               ativo: req.body.estatus
          }
          await db.collection('planos').add(plano)

          res.status(201).json('Plano criado com sucesso!')

     } catch (e) {
          res.status(400).json('Algo deu errado!', e)
     }

}

//Buscar Planos de Pagamento da platarforma
exports.buscarPlanos = async function (req, res, next) {
     await db.collection('planos').get()
          .then(snapshot => {
               var planos = [];
               snapshot.forEach(doc => {
                    if (!snapshot) {
                         return res.status(404).json('Nenhum plano encontrado!');
                    }
                    const plano = {
                         id: doc.id,
                         ...doc.data()
                    };
                    planos.push(plano)
               });

               return res.status(200).json(planos)
          })
          .catch(err => {
               return res.status(400).json(err, 'Algo deu errado');
          });
}




//Busca um unico plano de pagamento
exports.buscarPlanoPorID = async function (req, res, next) {

     const eventoRef = db.collection('planos').doc(`${req.params.id}`);
     await eventoRef.get()
          .then(doc => {
               if (!doc.exists) {
                    res.status(404).json('Plano não encontrado!')
               }
               const plano = {
                    id: doc.id,
                    ...doc.data()
               };

               res.status(200).json(plano);

          })
          .catch(err => {
               return res.status(400).json(err, 'Algo deu errado');
          });
}


//Atualiza um plano de pagamento
exports.atualizarPlano = async function (req, res, next) {
     try {
          await db.collection('planos').doc(`${req.params.id}`).update(req.body);


          res.status(201).json(`Plano atualizado com sucesso`)
     } catch (e) {
          res.status(400).json(e)
     }
}


//Ativar um plano de pagamento
exports.ativarPlano = async function (req, res, next) {
     try {

          await db.collection('planos').doc(`${req.params.id}`).update(req.body)

          res.status(201).json(`Plano ativado com sucesso`)
     } catch (e) {
          res.status(400).json(e)
     }

}

//Intivar um plano de pagamento
exports.inativarPlano = async function (req, res, next) {
     try {

          await db.collection('planos').doc(`${req.params.id}`).update(req.body)

          res.status(201).json(`Plano desativado com sucesso!`)
     } catch (e) {
          res.status(400).json(e)
     }
}

//Deletar um plano de pagamento
exports.deletarPlano = async function (req, res, next) {
     try {

          await db.collection('planos').doc(`${req.params.id}`).delete()

          return res.status(201).json(`Plano deletado com sucesso`)

     } catch (e) {
          res.status(500).json(e)
     }

}


