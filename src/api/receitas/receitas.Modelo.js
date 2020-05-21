const db = require('../../config/firestore');
const requisicao = require('request-promise')
const temorisador = require('node-schedule')
const momento = require('../../utilidades/moment')
const pegaErros = require('../../utilidades/manipulaErro');

//==========FUNÇÔES DESTE ESCOPO===================================
//== cadastrarReceita                                            ==
//== buscarReceitas                                              ==
//== buscarParcelasPorReceita                                    ==
//== buscarReceitaPorUsuario                                     ==
//== buscarReceitaPorID                                          ==
//== atualizarReceita                                            ==
//== atualizarParcela                                            ==
//== buscarInstituicoes ( atualizarParcelas)                     ==
//== atualizarStatusParcela == automática todos o dias às 00:00  ==
//=================================================================




const atualizarStatusParcelas = temorisador.scheduleJob({ hour: 23, minute: 38 }, function () {
    atualizarStatusParcela()
     console.log('Chamou a função atualizar parcelas!');
});



//pagar Parcela
exports.pagarParcela = async (req,res, next)=>{
     const options={
          method:'POST',
          header:{'Content-Type':'application/x-www-form-urlencoded; charset=ISO-8859-1'},
          uri:'https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?startupdobem@gmail.com&token=BE7229D489184D209E91C874C6ECB562'
     }
     
          const pagseguro =  requisicao(options).then(()=>{
               res.json(pagseguro.id)

          })    .catch(err=>{
               res.json(err   )
          })     
}

//Cadastrar Receitas
exports.cadastrarReceita = async (req, res, next) => {
     try {

          const agora = momento.moment().format('DD/MM/YYYY')

          const id_interno = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}${Date.now()}`;

          //As parcelas já devem vir com as datas de vencimento e valor definidos
          const receita = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               id_curso:req.body.id_curso,
               id_turma:req.body.id_turma,
               id_usuario: req.body.id_usuario || '',
               nome: req.body.nome,
               descricao: req.body.descricao || '',
               id_interno: id_interno,
               id_categoria: req.body.id_categoria,
               id_subcategoria: req.body.id_subcategoria || '',
               data_lancamento: agora,
               valorTotal: req.body.valorTotal,
               n_parcelas: req.body.n_parcelas
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas').add(receita)

          // Depois pegamos o Id da receita que acabamos de cadastrar
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas').where('id_interno', '==', `${id_interno}`).get()
               .then(docs => {
                    const id_receit = []; //Salvamo o id da receita que acabamos de salvar
                    docs.forEach(doc => {
                         id_receit.push(doc.id)
                    })
                    const parcelas = req.body.parcelas //pegamos as parcelas enviadas na requisição
                    const id_instituicao = req.params.id_instituicao

                    for (var i = 0; i < parcelas.length; i++) { //Colocamos o ID da receita em cada parcela
                         const dataFiltro = momento.moment(`${parcelas[i].data_vencimento}`, 'DD/MM/YYYY').unix()
                         parcelas[i].id_receita = id_receit[0]
                         parcelas[i].pertence_a_receita = receita.nome
                         parcelas[i].data_vencimentoFiltro = dataFiltro.toString()
                    }

                    parcelas.forEach(parcela => { //Depois salvamos as  parcelas em uma nova coleção
                         db.collection('instituicoes').doc(`${id_instituicao}`)
                              .collection('parcelas_receitas').add(parcela)

                    })

               })

          res.status(201).json(`Receita salva com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao salvar!', e, res)
     }
}

//Buscar todas as Receitas 
exports.buscarReceitas = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('receitas').get()
               .then(docs => {
                    if (docs.empty) {
                         res.status(404).json('Nenhuma receita encontrada! ')
                    } else {
                         var receitas = [];
                         docs.forEach(doc => {
                              const receita = {
                                   id: doc.id,
                                  ...doc.data()

                              };
                              receitas.push(receita)
                         });



                         res.status(200).json(receitas)
                    }
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar!', e, res)
     }
}



//Buscar Parcelas de uma Receita
exports.buscarParcelasPorReceita = async function (req, res, next) {
     try {
          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          b = busca.where('id_receita', '==', `${req.params.id_receita}`)
          b.get()
               .then(docs => {
                    if (docs.empty) {
                         res.status(404).json('Nenhuma parcela encontrada')
                    } else {
                         const parcelas = []
                         docs.forEach(doc => {
                              const parcela = {
                                   id: doc.id,
                                  ...doc.data()
                              };

                              parcelas.push(parcela)
                         })

                         res.status(200).json(parcelas);
                    }
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar parcelas', e, res)

     }
}

//Buscar Receita por Usuário
exports.buscarReceitaPorUsuario = async function (req, res, next) {
     try {
          const receitaRef = db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas')
          await receitaRef.where('id_usuario', '==', `${req.params.id_usuario}`).get()
               .then(docs => {
                    if (!docs) {
                         res.status(404).json('Nenhuma receita encontrada!')
                    } else {
                         var receitas = [];
                         docs.forEach(doc => {
                              const receita = {
                                   id: doc.id,
                                   ...doc.data()
                              };
                              receitas.push(receita)
                         });
                         res.status(200).json(receitas);
                    }

               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}

//Buscar uma unica Receita

exports.buscarReceitaPorID = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas').doc(`${req.params.id_receita}`).get()
               .then(doc => {
                    if (!doc) {
                         res.status(404).json('Nenhuma receita encontrada!')
                    } else {

                         const receita = {
                              id: doc.id,
                              ...doc.data()
                         };
                         res.status(200).json(receita);
                    }

               });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//Buscar uma unica Pacela

exports.buscarParcelaPoId = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas').doc(`${req.params.id_parcela}`).get()
               .then(doc => {
                    if (!doc) {
                         res.status(404).json('Nenhuma parcela encontrada!')
                    } else {
                         const parcela = {
                              id: doc.id,
                              ...doc.data()
                         };
                         res.status(200).json(parcela);
                    }

               });

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar parcela!', e, res)
     }
}


//Atualizar instituição
exports.atualizarReceita = async (req, res, next) => {
     try {

          const dataAtualização = momento.moment().format('DD/MM/YYYY')
          req.body.ultimaAtualizacao = dataAtualização

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas').doc(`${req.params.id_receita}`).update(req.body)

          res.status(201).json(`Atualizado com sucesso !`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar!', e, res)
     }

}


//Atualizar uma Parcela
exports.atualizarParcela = async (req, res, next) => {
     try {
          if (req.body.data_vencimento) {
               const dataFiltro = momento.moment(`${req.body.data_vencimento}`, 'DD/MM/YYYY').unix()
               req.body.data_vencimentoFiltro = dataFiltro.toString()
          }
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas').doc(`${req.params.id_parcela}`).update(req.body)

          res.status(201).json('Parcela atualizada com sucesso!')

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar!', e, res)
     }
}


/* //Deletar Receita
exports.deletarReceita = async function (req, res, next) {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas').doc(`${req.params.id_receita}`).delete()

          res.status(201).json(`Deletado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar!', e, res)
     }

} */

//===========================================ATUALIZAR STATUS DAS PARCELAS =====================================

//Atualizar os status das parcelas
async function atualizarStatusParcela() {
     console.log('..atualizarStatusParcela..')
     try {
          const instituicoes = await buscarInstituicoes()
                   
          const parcelas = []
          for (var i = 0; i < instituicoes.length; i++) {
               const id_inst = instituicoes[i].id //Pega o ID da instituição a cada entrada no for
               const dataAtual = momento.moment().format('DD/MM/YYYY')
               const hoje = momento.moment(`${dataAtual}`, 'DD/MM/YYYY').unix()
               const buscar = await db.collection('instituicoes').doc(`${instituicoes[i].id}`).collection('parcelas_receitas')
               b = buscar.where('data_vencimentoFiltro', '<', `${hoje}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const parcela = {
                                   id: doc.id,
                                   status: doc.data().status,
                                   data_vencimento: doc.data().data_vencimento,
                                   id_instituicao: id_inst
                              }

                              parcelas.push(parcela)
                         })
                         


                         for (var i = 0; i < parcelas.length; i++) {
                              if (parcelas[i].status == 'A PAGAR') {
                                   const novaParcela = {
                                        status: 'EM ATRASO'
                                   }
                                   db.collection('instituicoes').doc(`${parcelas[i].id_instituicao}`)
                                        .collection('parcelas_receitas').doc(`${parcelas[i].id}`).update(novaParcela)
                              }
                         }

                    })
          }
          console.log('Atualizou as parcelas')
     } catch (e) {
          console.log('Erro ao atualizar as parcelas ' + e)
     }
}


//Buscar todas as Intituições
const buscarInstituicoes = async () => {
     console.log('..buscarInstituicoes..')
     try {
          const instituicoes = [];
          await db.collection('instituicoes').get()
               .then(docs => {

                    docs.forEach(doc => {
                         const instituicao = {
                              id: doc.id,

                         };
                         instituicoes.push(instituicao)
                    });
               })

          return instituicoes
     } catch (e) {
          pegaErros.manipulaErros('Erro ao buscar instituições!', e, res)
     }

}


