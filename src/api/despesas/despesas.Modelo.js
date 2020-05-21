const db = require('../../config/firestore');
const momento = require('../../utilidades/moment')
const pegaErros = require('../../utilidades/manipulaErro');

//Cadastrar Despesas
exports.cadastrarDespesa = async (req, res, next) => {
     try {

          const agora = momento.moment().format('DD/MM/YYYY')
          const data_pagamentoFiltro = momento.moment(`${req.body.data_pagamento}`, 'DD/MM/YYYY').unix()
               dataFiltro.toString()

          const despesa = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               nome: req.body.nome,
               descricao: req.body.descricao,
               id_categoria: req.body.id_categoria,
               id_subcategoria:req.body.id_subcategoria || '',
               data_pagamento: req.body.data_pagamento,
               dataFiltro:data_pagamentoFiltro,
               data_lancamento: agora,
               valor_pago: req.body._pago,
               status:req.body.status

          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas').add(despesa)

          res.status(201).json(`Despesa cadastrada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao salvar!', e, res)
     }
}

//Buscar todas as Despesas 
exports.buscarDespesas = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('despesas').get()
               .then(docs => {
                    if (docs.empty) {
                         res.status(404).json('Nenhuma despesa encontrada! ')
                    } else {
                         var despesas = [];
                         docs.forEach(doc => {
                              const despesa = {
                                   id: doc.id,
                                   ...doc.data()

                              };

                              despesas.push(despesa)
                         });

                         res.status(200).json(despesas)
                    }
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesa!', e, res)
     }
}



//Buscar despesa por Id 
exports.buscarDespesaPorID = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas').doc(`${req.params.id_despesa}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         return pegaErros.manipulaErros('Nenhuma despesa encontrada', e, res)
                    } else {
                         const despesa = {
                              id: doc.id,
                              ...doc.data()
                         };

                         res.status(200).json(despesa);
                    }
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesa', e, res)

     }
}

//Atualizar Despesa
exports.atualizarDespesa = async (req, res, next) => {
     try {          
          if(req.body.data){
               
               const dataFiltro = momento.moment(`${req.body.data}`, 'DD/MM/YYYY').unix()
                    dataFiltro.toString()
               req.body.dataFiltro = dataFiltro
          }
          
          db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas').doc(`${req.params.id_despesa}`).update(req.body)

          res.status(201).json(`Despesa atualizada com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar despesa!', e, res)
     }

}

/* //Deletar despesa
exports.deletardespesa = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('Despesas').doc(`${req.params.id_despesa}`).delete()

          res.status(201).json(`Deletado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar!', e, res)
     }

} */
