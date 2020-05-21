const db = require('../../config/firestore')
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')


const mesAtual = momento.moment().format('MM')
const anoAtual = momento.moment().format('YYYY')


//Buscar Despesas e aplicando filtros

exports.buscarDerspesasComFiltro = async (req, res, next) => {
     try {
          const ultimoDiaDoMes = async (a, m) => { //Função para pegar o Último dia do Mês atual
               return new Date(a, m, 0).getDate()
          }

          const dia = await ultimoDiaDoMes(anoAtual, mesAtual) //Executamos a função e pegamos o último dia do mês

          const dataIncioAlternativa = `01/${mesAtual}/${anoAtual}` //geramos a data inicio da consulta
          const dataFimAlternativa = `${dia}/${mesAtual}/${anoAtual}` //geramos a data fim da consulta

          const minhasDespesas = []
          /* var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0 */

          const d_i = req.body.dataInicio || dataIncioAlternativa //caso o usuario não envie a data ele pega a do mes atual
          const d_f = req.body.dataFim || dataFimAlternativa

          const dataInicio = momento.moment(`${d_i}`, 'DD/MM/YYYY').unix() //Tranformamos as datas em milisegundos
          const dataFim = momento.moment(`${d_f}`, 'DD/MM/YYYY').unix()

          
          var buscarDespesas = ''

          if(!req.body.id_escola && !req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 1 nehum filtro ale de data')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`).get()
          }

          if (req.body.id_escola && !req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 2 E')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`).get()
          }
          if (req.body.id_escola && !req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 3  E+C')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`).get()
          }
          if (req.body.id_escola && !req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 4  E+C+SB')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`)
                    .where('id_subcategoria','==',`${req.body.id_subcategoria}`).get()
          }
          if (!req.body.id_escola && req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 5 S')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`).get()
          }
          if (!req.body.id_escola && req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 6 S+C')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`).get()
          }
          if (!req.body.id_escola && req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 7 S+C+SB')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`)
                    .where('id_subcategoria','==',`${req.body.id_subcategoria}`).get()
          }
          
          if (!req.body.id_escola && !req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 8 C')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`).get()
          }

          if (req.body.id_escola && req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 9 E+S')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('status', '==', `${req.body.status}`).get()
          }
          if (req.body.id_escola && req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 10 E+S+C')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`).get()
          }
          if (!req.body.id_escola && !req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 11 C+SB')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`)
                    .where('id_subcategoria', '==', `${req.body.id_subcategoria}`).get()
          }
          if (req.body.id_escola && req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 12 E+S+C+SB')
               buscarDespesas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('despesas')
                    .where('data_pagamentoFiltro', '>=', `${dataInicio}`)
                    .where('data_pagamentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`)
                    .where('id_subcategoria', '==', `${req.body.id_subcategoria}`).get()
          }          


          buscarDespesas.forEach(parce => {
               minhasDespesas.push(parce.data())
          })


          Promise.all(minhasDespesas)

           const valores = {}
           /*
          valores.totalReceitas = totalReceitas
          valores.totalDesconto = totalDesconto
          valores.totalLiquido = totalLiquido */
          const despesasProntas = { despesas: minhasDespesas, valores: valores }

          res.status(200).json(despesasProntas)



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
     }

}


//Buscar todas a Despesas do Mês Somente o valor total
exports.despesasMensaisValorTotal = async (req, res, next) => {
     try {
          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas');

          busca.get()
               .then(docs => {
                    var totalDespesas = 0
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data
                         const dataCortada = dataSalva.split('/')
                         const mesDespesa = dataCortada[1]
                         const anoDespesa = dataCortada[2]

                         if (mesDespesa === mesAtual && anoDespesa === anoAtual) {
                              totalDespesas = totalDespesas + doc.data().valor

                         }
                    })

                    res.status(200).json({ totalDesesas: totalDespesas })
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas! ', e, res)
     }
}


//Buscar todas a Despesas do Anuais, Somente valor
exports.despesasAnoValorTotal = async (req, res, next) => {
     try {
          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas');
          busca.get()
               .then(docs => {
                    var totalDespesas = 0
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data
                         const dataCortada = dataSalva.split('/')
                         const anoDespesa = dataCortada[2]


                         if (anoDespesa === anoAtual) {
                              totalDespesas = totalDespesas + doc.data().valor

                         }
                    })

                    res.status(200).json({ totalDesesas: totalDespesas })
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas! ', e, res)
     }
}


//======================================POR ESCOLA=========================================

//Buscar Despesas e aplicando filtros

exports.despesasPorCategoriaEscola = async (req, res, next) => {
     try {

          const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
          const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio

          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas');

          if (req.body.id_categoria && !req.body.id_subcategoria) {//Se o usuário mandar somente a categoria

               if (!req.body.dataInicio && !req.body.dataFim) { // e não mandar data para filtro (Mando do mês atual)
                    try {
                         b = busca.where('id_escola', '==', `${req.params.id_escola}`)
                         b1 = b.where('id_categoria', '==', `${req.body.id_categoria}`)
                         b1.get()
                              .then(docs => {
                                   const despesas = []
                                   var totalDespesas = 0
                                   docs.forEach(doc => {

                                        const dataSalva = doc.data().data
                                        const dataCortada = dataSalva.split('/')
                                        const mesDespesa = dataCortada[1]
                                        const anoDespesa  =dataCortada[2]

                                        if (mesDespesa === mesAtual && anoDespesa ===anoAtual) {
                                             totalDespesas = totalDespesas + doc.data().valor
                                             const despesa = {
                                                  id: doc.id,
                                                  id_instituicao: doc.data().id_instituicao,
                                                  id_escola: doc.data().id_escola,
                                                  nome: doc.data().nome,
                                                  descricao: doc.data().descricao,
                                                  id_categoria: doc.data().id_categoria,
                                                  id_subcategoria: doc.data().id_subcategoria,
                                                  data: doc.data().data,
                                                  data_lancamento: doc.data().data_lancamento,
                                                  valor: doc.data().valor
                                             }
                                             despesas.push(despesa)

                                        }

                                   })

                                   despesas.push({ totalDesesas: totalDespesas })

                                   res.status(200).json(despesas)
                              })
                    } catch (e) {
                         return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
                    }
               } else { //Se mandar as datas, aplica o filtro
                    try {
                         b = busca.where('id_escola', '==', `${req.params.id_escola}`)
                         b1 = b.where('dataFiltro', '>=', `${dataInicio}`)
                         b2 = b1.where('dataFiltro', '<=', `${dataFim}`)
                         b3 = b2.where('id_categoria', '==', `${req.body.id_categoria}`)
                         b3.get()
                              .then(docs => {
                                   const despesas = []
                                   var totalDespesas = 0
                                   docs.forEach(doc => {
                                        totalDespesas = totalDespesas + doc.data().valor
                                        const despesa = {
                                             id: doc.id,
                                             id_instituicao: doc.data().id_instituicao,
                                             id_escola: doc.data().id_escola,
                                             nome: doc.data().nome,
                                             descricao: doc.data().descricao,
                                             id_categoria: doc.data().id_categoria,
                                             id_subcategoria: doc.data().id_subcategoria,
                                             data: doc.data().data,
                                             data_lancamento: doc.data().data_lancamento,
                                             valor: doc.data().valor
                                        }

                                        despesas.push(despesa)
                                   })
                                   despesas.push({ totalDesesas: totalDespesas })

                                   res.status(200).json(despesas)
                              })

                    } catch (e) {
                         return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
                    }

               }

          } else if (req.body.id_categoria && req.body.id_subcategoria) { // Se o usuário mandar a Categoria e subcategoria
               if (!req.body.dataInicio && !req.body.dataFim) { //e não mandar datas para filtro (manda o mês atual)
                    try {
                         b = busca.where('id_escola', '==', `${req.params.id_escola}`)
                         b1 = b.where('id_categoria', '==', `${req.body.id_categoria}`)
                         b2 = b1.where('id_subcategoria', '==', `${req.body.id_subcategoria}`)
                         b2.get()
                              .then(docs => {
                                   const despesas = []
                                   var totalDespesas = 0
                                   docs.forEach(doc => {

                                        const dataSalva = doc.data().data
                                        const dataCortada = dataSalva.split('/')
                                        const mesDespesa = dataCortada[1]
                                        const anoDespesa  =dataCortada[2]

                                        if (mesDespesa === mesAtual && anoDespesa ===anoAtual) {
                                             totalDespesas = totalDespesas + doc.data().valor
                                             const despesa = {
                                                  id: doc.id,
                                                  id_instituicao: doc.data().id_instituicao,
                                                  id_escola: doc.data().id_escola,
                                                  nome: doc.data().nome,
                                                  descricao: doc.data().descricao,
                                                  id_categoria: doc.data().id_categoria,
                                                  id_subcategoria: doc.data().id_subcategoria,
                                                  data: doc.data().data,
                                                  data_lancamento: doc.data().data_lancamento,
                                                  valor: doc.data().valor
                                             }
                                             despesas.push(despesa)

                                        }

                                   })
                                   despesas.push({ totalDesesas: totalDespesas })
                                   res.status(200).json(despesas)
                              })

                    } catch (e) {
                         return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
                    }

               } else {//Se mandar as datas, aplica o filtro
                    try {
                         b = busca.where('id_escola', '==', `${req.params.id_escola}`)
                         b1 = b.where('dataFiltro', '>=', `${dataInicio}`)
                         b2 = b1.where('dataFiltro', '<=', `${dataFim}`)
                         b3 = b2.where('id_categoria', '==', `${req.body.id_categoria}`)
                         b4 = b3.where('id_subcategoria', '==', `${req.body.id_subcategoria}`)
                         b4.get()
                              .then(docs => {
                                   const despesas = []
                                   var totalDespesas = 0
                                   docs.forEach(doc => {
                                        totalDespesas = totalDespesas + doc.data().valor
                                        const despesa = {
                                             id: doc.id,
                                             id_instituicao: doc.data().id_instituicao,
                                             id_escola: doc.data().id_escola,
                                             nome: doc.data().nome,
                                             descricao: doc.data().descricao,
                                             id_categoria: doc.data().id_categoria,
                                             id_subcategoria: doc.data().id_subcategoria,
                                             data: doc.data().data,
                                             data_lancamento: doc.data().data_lancamento,
                                             valor: doc.data().valor
                                        }

                                        despesas.push(despesa)
                                   })
                                   despesas.push({ totalDesesas: totalDespesas })
                                   res.status(200).json(despesas)
                              })

                    } catch (e) {
                         return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
                    }
               }

          } else { //Caso o usuário não envie categoria e subcategoria 
               if (!req.body.dataInicio && !req.body.dataFim) { //Caso o suario não mande data, pegamos tudo do mês atual
                    try {
                         b = busca.where('id_escola', '==', `${req.params.id_escola}`)
                         b.get()
                              .then(docs => {
                                   const despesas = []
                                   var totalDespesas = 0
                                   docs.forEach(doc => {

                                        const dataSalva = doc.data().data
                                        const dataCortada = dataSalva.split('/')
                                        const mesDespesa = dataCortada[1]
                                        const anoDespesa  =dataCortada[2]

                                        if (mesDespesa === mesAtual && anoDespesa ===anoAtual) {
                                             totalDespesas = totalDespesas + doc.data().valor
                                             const despesa = {
                                                  id: doc.id,
                                                  id_instituicao: doc.data().id_instituicao,
                                                  id_escola: doc.data().id_escola,
                                                  nome: doc.data().nome,
                                                  descricao: doc.data().descricao,
                                                  id_categoria: doc.data().id_categoria,
                                                  id_subcategoria: doc.data().id_subcategoria,
                                                  data: doc.data().data,
                                                  data_lancamento: doc.data().data_lancamento,
                                                  valor: doc.data().valor
                                             }
                                             despesas.push(despesa)

                                        }

                                   })

                                   despesas.push({ totalDesesas: totalDespesas })
                                   res.status(200).json(despesas)
                              })

                    } catch (e) {
                         return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
                    }


               } else { //Caso tenha mandado as datas, o filtro de datas é aplicado na busca
                    try {
                         b = busca.where('id_escola', '==', `${req.params.id_escola}`)
                         b1 = b.where('dataFiltro', '>=', `${dataInicio}`)
                         b2 = b1.where('dataFiltro', '<=', `${dataFim}`)
                         b2.get()
                              .then(docs => {
                                   const despesas = []
                                   var totalDespesas = 0
                                   docs.forEach(doc => {

                                        totalDespesas = totalDespesas + doc.data().valor
                                        const despesa = {
                                             id: doc.id,
                                             id_instituicao: doc.data().id_instituicao,
                                             id_escola: doc.data().id_escola,
                                             nome: doc.data().nome,
                                             descricao: doc.data().descricao,
                                             id_categoria: doc.data().id_categoria,
                                             id_subcategoria: doc.data().id_subcategoria,
                                             data: doc.data().data,
                                             data_lancamento: doc.data().data_lancamento,
                                             valor: doc.data().valor
                                        }

                                        despesas.push(despesa)

                                   })
                                   despesas.push({ totalDesesas: totalDespesas })
                                   res.status(200).json(despesas)
                              })

                    } catch (e) {
                         return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
                    }

               }
          }



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas!', e, res)
     }
}

//-----------------------------------------------------------------------------------------------------
//Buscar todas a Despesas do Mês

exports.despesasMensaisEscola = async (req, res, next) => {
     try {
          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas');
          b = busca.where('id_escola', '==', `${req.params.id_escola}`)
          b.get()
               .then(docs => {
                    const despesas = []
                    var totalDespesas = 0

                    docs.forEach(doc => {
                         const dataSalva = doc.data().data
                         const dataCortada = dataSalva.split('/')
                         const mesDespesa = dataCortada[1]
                         const anoDespesa  =dataCortada[2]

                         if (mesDespesa === mesAtual && anoDespesa ===anoAtual) {
                              totalDespesas = totalDespesas + doc.data().valor

                              const despesa = {
                                   id: doc.id,
                                   id_instituicao: doc.data().id_instituicao,
                                   id_escola: doc.data().id_escola,
                                   nome: doc.data().nome,
                                   descricao: doc.data().descricao,
                                   id_categoria: doc.data().id_categoria,
                                   id_subcategoria: doc.data().id_subcategoria,
                                   data: doc.data().data,
                                   data_lancamento: doc.data().data_lancamento,
                                   valor: doc.data().valor
                              }
                              despesas.push(despesa)

                         }

                    })

                    despesas.push({ totalDesesas: totalDespesas })

                    res.status(200).json(despesas)
               })



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas! ', e, res)
     }
}


//Buscar todas a Despesas do Mês Somente o valor total
exports.despesasMensaisValorTotalEscola = async (req, res, next) => {
     try {
          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas');
          b = busca.where('id_escola', '==', `${req.params.id_escola}`)
          b.get()
               .then(docs => {
                    var totalDespesas = 0
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data
                         const dataCortada = dataSalva.split('/')
                         const mesDespesa = dataCortada[1]
                         const anoDespesa  =dataCortada[2]

                         if (mesDespesa === mesAtual && anoDespesa ===anoAtual) {
                              totalDespesas = totalDespesas + doc.data().valor

                         }
                    })

                    res.status(200).json({ totalDesesas: totalDespesas })
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas! ', e, res)
     }
}


//Buscar todas a Despesas do Anuais, Somente valor
exports.despesasAnoValorTotalEscola = async (req, res, next) => {
     try {
          const busca = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('despesas');
          b = busca.where('id_escola', '==', `${req.params.id_escola}`)
          b.get()
               .then(docs => {
                    var totalDespesas = 0
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data
                         const dataCortada = dataSalva.split('/')
                         const anoDespesa = dataCortada[2]


                         if (anoDespesa === anoAtual) {
                              totalDespesas = totalDespesas + doc.data().valor

                         }
                    })

                    res.status(200).json({ totalDesesas: totalDespesas })
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar despesas! ', e, res)
     }
}



