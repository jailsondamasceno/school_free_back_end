const db = require('../../config/firestore')
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')

const mesAtual = momento.moment().format('MM')
const anoAtual = momento.moment().format('YYYY')

//======================Funções deste Escopo===================
//== parcelasDoMesSemDataFiltro                              ==
//== parcelasDoMesSemDataFiltroComStatus                     ==
//== parcelasDoMesComDataFiltro                              ==
//== parcelasDoMesComDataFiltroEstatus                       ==
//== parcelasPorCategoriaSemDataFiltro                       ==
//== parcelasPorCategoriaSemDataFiltroEstatus                == 
//== parcelasPorCategoriaComDataFiltro                       ==
//== parcelasPorCategoriaComDataFiltroEstatus                ==
//== parcelasPorCateg_E_Subcat_SemDataFiltro                 ==
//== parcelasPorCateg_E_Subcat_SemDataFiltroEstatus          ==
//== parcelasPorCateg_E_Subcat_ComDataFiltro                 ==
//== parcelasPorCateg_E_Subcat_ComDataFiltroEstatus          ==
//== Função Princial - Filtrar Receitas                      ==
//==============Funções Independentes =========================
//== buscarReceitasMesSoValor                                ==
//== buscarReceitasMesSoValorEmAtraso                        ==
//== buscarReceitasAnoSoValor                                ==
//== buscarReceitasAnoSoValorEmAtraso                        ==
//== buscarUsuariosComParcelasEmAtraso (Repete se tive+parc) ==
//== pegarUsuariosDaEscola                                   ==
//== pegarParcelasEmAtraso                                   ==
//== buscarReceitas                                          ==
//=============================================================



//Função Principal  - Filtrar Receitas
exports.filtrarReceitasES = async (req, res, next) => {
     if (req.body.id_categoria && req.body.id_subcategoria && req.body.status && req.body.dataInicio && req.body.dataFim) {

          parcelasPorCateg_E_Subcat_ComDataFiltroEstatus(req, res, next)

     } else if (req.body.id_categoria && req.body.id_subcategoria && req.body.status && !req.body.dataInicio && !req.body.dataFim) {

          parcelasPorCateg_E_Subcat_SemDataFiltroEstatus(req, res, next)

     } else if (req.body.id_categoria && req.body.id_subcategoria && !req.body.status && req.body.dataInicio && req.body.dataFim) {

          parcelasPorCateg_E_Subcat_ComDataFiltro(req, res, next)

     } else if (req.body.id_categoria && req.body.id_subcategoria && !req.body.status && !req.body.dataInicio && !req.body.dataFim) {

          parcelasPorCateg_E_Subcat_SemDataFiltro(req, res, next)

     } else if (req.body.id_categoria && !req.body.id_subcategoria && !req.body.status && !req.body.dataInicio && !req.body.dataFim) {

          parcelasPorCategoriaSemDataFiltro(req, res, next)
     } else if (req.body.id_categoria && !req.body.id_subcategoria && !req.body.status && req.body.dataInicio && req.body.dataFim) {

          parcelasPorCategoriaComDataFiltro(req, res, next)

     } else if (req.body.id_categoria && !req.body.id_subcategoria && req.body.status && !req.body.dataInicio && !req.body.dataFim) {

          parcelasPorCategoriaSemDataFiltroEstatus(req, res, next)

     } else if (req.body.id_categoria && !req.body.id_subcategoria && req.body.status && req.body.dataInicio && req.body.dataFim) {

          parcelasPorCategoriaComDataFiltroEstatus(req, res, next)
     } else if (!req.body.id_categoria && !req.body.id_subcategoria && req.body.status && !req.body.dataInicio && !req.body.dataFim) {

          parcelasDoMesSemDataFiltroComStatus(req, res, next)

     } else if (!req.body.id_categoria && !req.body.id_subcategoria && req.body.status && req.body.dataInicio && req.body.dataFim) {

          parcelasDoMesComDataFiltroEstatus(req, res, next)

     } else if (!req.body.id_categoria && !req.body.id_subcategoria && !req.body.status && req.body.dataInicio && req.body.dataFim) {

          parcelasDoMesComDataFiltro(req, res, next)
     } else {
          parcelasDoMesSemDataFiltro(req, res, next)
     }
}





//==================== Funções de filtro =========================//

//=======================================================================================
//Função que buscar todas as parcelas Do Mês atual sem filtro de data e status por Escola
const parcelasDoMesSemDataFiltro = async (req, res, next) => {
     console.log('..parcelasDoMesSemDataFiltro...')
     try {
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          for (var i = 0; i < receitas.length; i++) {

               await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas').where('id_receita', '==', `${receitas[i].id}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês
                              const anoParcela = dataCortada[2]//Pega ano

                              if (mesParcela === mesAtual && anoParcela === anoAtual) {

                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                   const parcela = {
                                        id: doc.id,
                                        ...doc.data()
                                   }
                                   parcelas.push(parcela)

                              }//Fim if

                         })//Fim do ForEach

                    }).catch(err => { return err })//Fim do then               
          }
          parcelas.push({ totalReceitas: totalReceitas })
          parcelas.push({ totalDesconto: totalDesconto })
          parcelas.push({ totalLiquido: totalLiquido })
          res.status(200).json(parcelas)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }

}

//==============================================================================================================
//Buscar Receitas Por Curso e Por Turma
exports.buscarReceitasPorCursoETurmaES = async (req, res, next) => {
     try {
          console.log('..buscarReceitasPorCursoETurma..')
          var buscaParcelas = ''
          const valorReceitas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          if (req.body.id_turma && !req.body.status) {               
               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('id_curso', '==', `${req.params.id_curso}`)
                    .where('id_turma', '==', `${req.body.id_turma}`)
          } else if (req.body.status &&!req.body.id_turma) {  
                            
               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('id_curso', '==', `${req.params.id_curso}`)
                    .where('status', '==', `${req.body.status}`)
          } else if (req.body.id_turma && req.body.status) {
               
               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('id_curso', '==', `${req.params.id_curso}`)
                    .where('id_turma', '==', `${req.body.id_turma}`)
                    .where('status', '==', `${req.body.status}`)
          } else {   

               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_escola', '==', `${req.params.id_escola}`)
                    .where('id_curso', '==', `${req.params.id_curso}`)
          }

          buscaParcelas.get()
               .then(docs => {
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data_vencimento
                         const dataCortada = dataSalva.split('/')
                         const mesParcela = dataCortada[1]//Pega o mês
                         const anoParcela = dataCortada[2] // Pega Ano

                         const mes = req.body.mes || mesAtual
                         const ano = req.body.ano || anoAtual

                         if (mesParcela === mes && anoParcela === ano) {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar
                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              valorReceitas.push(parcela)

                         }//Fim if

                    })//Fim ForEach

                    valorReceitas.push({ totalReceitas: totalReceitas })
                    valorReceitas.push({ totalDesconto: totalDesconto })
                    valorReceitas.push({ totalLiquido: totalLiquido })
                    res.status(200).json(valorReceitas)

               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}





//Buscar Receitas da escola passando o ID da instituicao e da escola
//=======================================================================================
const buscarReceitas = async (id_instituicao, id_escola) => {
     console.log('...buscarReceitas..')
     try {
          const receitas = []
          const buscaReceitas = await db.collection('instituicoes').doc(`${id_instituicao}`)
               .collection('receitas').where('id_escola', '==', `${id_escola}`).get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id
                         }
                         receitas.push(receita)
                    })
               })

          return receitas

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}

//Buscar Receitas da escola passando o ID da instituicao e da escola e ID da categoria
//=======================================================================================
const buscarReceitasCategoria = async (id_instituicao, id_escola, id_categoria) => {
     console.log('...buscarReceitas..')
     try {
          const receitas = []
          const buscaReceitas = await db.collection('instituicoes').doc(`${id_instituicao}`)
               .collection('receitas').where('id_escola', '==', `${id_escola}`)
               .where('id_categoria', '==', `${id_categoria}`).get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id
                         }
                         receitas.push(receita)
                    })
               })

          return receitas

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}

//Buscar Receitas da escola passando o ID da instituicao e da escola e ID da categoria
//=======================================================================================
const buscarReceitasCateg_Subcat = async (id_instituicao, id_escola, id_categoria, id_subcategoria) => {
     console.log('...buscarReceitas..')
     try {
          const receitas = []
          const buscaReceitas = await db.collection('instituicoes').doc(`${id_instituicao}`)
               .collection('receitas').where('id_escola', '==', `${id_escola}`)
               .where('id_categoria', '==', `${id_categoria}`)
               .where('id_subcategoria', '==', `${id_subcategoria}`).get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id
                         }
                         receitas.push(receita)
                    })
               })

          return receitas

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}




//============================================================================================================
//Função que buscar todas as parcelas Do Mês atual sem filtro de data e Com status
const parcelasDoMesSemDataFiltroComStatus = async (req, res, next) => {
     console.log('..parcelasDoMesSemDataFiltroComStatus..')
     try {
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) {

               const buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_receita', '==', `${receitas[i].id}`)
                    .where('status', '==', `${req.body.status}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês
                              const anoParcela = dataCortada[2]//Pega ano

                              if (mesParcela === mesAtual && anoParcela === anoAtual) {

                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                   const parcela = {
                                        id: doc.id,
                                        ...doc.data()
                                   }
                                   parcelas.push(parcela)

                              }//Fim if
                         })
                    }).catch(err => { return err })
          }

          parcelas.push({ totalReceitas: totalReceitas })
          parcelas.push({ totalDesconto: totalDesconto })
          parcelas.push({ totalLiquido: totalLiquido })
          res.status(200).json(parcelas)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!===', e, res)
     }

}

//============================================================================================================
//Função que buscar todas as parcelas //Somente aplicando o filtro de datas
const parcelasDoMesComDataFiltro = async (req, res, next) => {
     console.log('..parcelasDoMesComDataFiltro ..')
     try {
          const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
          const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) {
               buscaParcelas.where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar
                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }

                              parcelas.push(parcela)

                         })

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)

                    }).catch(err => { return err })

          }

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//============================================================================================================
//Função que buscar todas as parcelas //Somente aplicando o filtro de datas e Status
const parcelasDoMesComDataFiltroEstatus = async (req, res, next) => {
     console.log('..parcelasDoMesComDataFiltroEstatus..')
     try {
          const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
          const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) {
               buscaParcelas.where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar
                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }

                              parcelas.push(parcela)

                         })
                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)

                    }).catch(err => { return err }) //Fim do then
          }//Fim do for



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}

//============================================================================================================
//Buscar parcelas do mês aplicando filtro de Categoria e sem filtro de  data e sem Status
const parcelasPorCategoriaSemDataFiltro = async (req, res, next) => {
     console.log('..parcelasPorCategoriaSemDataFiltro...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCategoria(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês parcela
                              const anoParcela = dataCortada[2]//Pega o ano da parcela

                              if (mesParcela === mesAtual && anoParcela === anoAtual) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                   const parcela = {
                                        id: doc.id,
                                        ...doc.data()
                                   }
                                   parcelas.push(parcela)

                              }//Fim if

                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err })//Fim  then
          } //fim do for


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//============================================================================================================
//Buscar parcelas do mês aplicando filtro de Categoria e sem filtro de  data e com Status
const parcelasPorCategoriaSemDataFiltroEstatus = async (req, res, next) => {
     console.log('...parcelasPorCategoriaSemDataFiltroEstatus...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCategoria(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                    .where('status', '==', `${req.body.status}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês parcela
                              const anoParcela = dataCortada[2]//Pega o ano da parcela

                              if (mesParcela === mesAtual && anoParcela === anoAtual) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                   const parcela = {
                                        id: doc.id,
                                        ...doc.data()
                                   }
                                   parcelas.push(parcela)

                              }//Fim if

                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err })//Fim  then
          } //fim do for


     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}



//============================================================================================================
//Buscar parcelas do mês aplicando filtro de Categoria com data e sem status
const parcelasPorCategoriaComDataFiltro = async (req, res, next) => {
     console.log('..parcelasPorCategoriaComDataFiltro...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCategoria(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
               const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              parcelas.push(parcela)



                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err })//Fim do  then
          } //fim do for

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//============================================================================================================
//Buscar parcelas do mês aplicando filtro de Categoria com data e Com status
const parcelasPorCategoriaComDataFiltroEstatus = async (req, res, next) => {
     console.log('..parcelasPorCategoriaComDataFiltroEstatus...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCategoria(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
               const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              parcelas.push(parcela)



                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err })//Fim do  then
          } //fim do for

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}



//============================================================================================================
//Buscar parcelas do mês, aplicando filtro de Categoria e subcategoria e sem filtro de  data e sem Status
const parcelasPorCateg_E_Subcat_SemDataFiltro = async (req, res, next) => {
     console.log('..parcelasPorCateg_E_Subcat_SemDataFiltro...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCateg_Subcat(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria, req.body.id_subcategoria)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês parcela
                              const anoParcela = dataCortada[2]//Pega o ano da parcela

                              if (mesParcela === mesAtual && anoParcela === anoAtual) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                   const parcela = {
                                        id: doc.id,
                                        ...doc.data()
                                   }
                                   parcelas.push(parcela)

                              }//Fim if

                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err })//Fim do  then
          } //fim do for

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//============================================================================================================
//Buscar parcelas do mês, aplicando filtro de Categoria e subcategoria e sem filtro de  data e com status
const parcelasPorCateg_E_Subcat_SemDataFiltroEstatus = async (req, res, next) => {
     console.log('..parcelasPorCateg_E_Subcat_SemDataFiltroEstatus...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCateg_Subcat(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria, req.body.id_subcategoria)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                    .where('status', '==', `${req.body.status}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês parcela
                              const anoParcela = dataCortada[2]//Pega o ano da parcela

                              if (mesParcela === mesAtual && anoParcela === anoAtual) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                   const parcela = {
                                        id: doc.id,
                                        ...doc.data()
                                   }
                                   parcelas.push(parcela)

                              }//Fim if

                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err })//Fim do  then
          } //fim do for

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}




//============================================================================================================
//Buscar parcelas de um período aplicando filtro de Categoria, Subcategoria, com data, e sem status
const parcelasPorCateg_E_Subcat_ComDataFiltro = async (req, res, next) => {
     console.log('..parcelasPorCateg_E_Subcat_ComDataFiltro...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCateg_Subcat(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria, req.body.id_subcategoria)
          const parcelas = [] //Guardamos as parcelas
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
               const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              parcelas.push(parcela)



                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err }) //Fim do  then
          } //fim do for
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}



//============================================================================================================
//Buscar parcelas de um período aplicando filtro de Categoria, Subcategoria, com data, e status
const parcelasPorCateg_E_Subcat_ComDataFiltroEstatus = async (req, res, next) => {
     console.log('..parcelasPorCateg_E_Subcat_ComDataFiltroEstatus...')
     try {
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const receitas = await buscarReceitasCateg_Subcat(req.params.id_instituicao, req.params.id_escola, req.body.id_categoria, req.body.id_subcategoria)
          const parcelas = [] //Guardamos as parcelas
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
               // então buscamos todas as parcelas dessa receita 
               const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
               const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio
               buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              parcelas.push(parcela)



                         })//Fim ForEach

                         parcelas.push({ totalReceitas: totalReceitas })
                         parcelas.push({ totalDesconto: totalDesconto })
                         parcelas.push({ totalLiquido: totalLiquido })
                         res.status(200).json(parcelas)


                    }).catch(err => { return err }) //Fim do  then
          } //fim do for
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}




//=================================FUNÇÕES INDEPENDENTES========================================================
//==============================================================================================================
//Receitas do Mês só VALOR Se não mandar o Mês pega o Mês Atual
exports.buscarReceitasMesSoValorES = async (req, res, next) => {
     console.log('...buscarReceitasMesSoValorES..')
     try {
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          for (var i = 0; i < receitas.length; i++) {

               await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas').where('id_receita', '==', `${receitas[i].id}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês
                              const anoParcela = dataCortada[2]//Pega ano
                              const mes = req.body.mes || mesAtual
                              const ano = req.body.ano || anoAtual

                              if (mesParcela === mes && anoParcela === ano) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              }//Fim if

                         })//Fim do ForEach

                    }).catch(err => { return err })//Fim do then               
          }
          parcelas.push({ totalReceitas: totalReceitas })
          parcelas.push({ totalDesconto: totalDesconto })
          parcelas.push({ totalLiquido: totalLiquido })
          res.status(200).json(parcelas)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//==============================================================================================================
//Receitas do Mês só VALOR EM ATRASO Se não mandar o Mês pega o Mês Atual
exports.buscarReceitasMesSoValorEmAtrasoES = async (req, res, next) => {
     console.log('..buscarReceitasMesSoValorEmAtrasoES..')
     try {
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          for (var i = 0; i < receitas.length; i++) {

               await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas').where('id_receita', '==', `${receitas[i].id}`)
                    .where('status', '==', 'EM ATRASO').get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const mesParcela = dataCortada[1]//Pega o mês
                              const anoParcela = dataCortada[2]//Pega ano
                              const mes = req.body.mes || mesAtual
                              const ano = req.body.ano || anoAtual

                              if (mesParcela === mes && anoParcela === ano) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              }//Fim if

                         })//Fim do ForEach

                    }).catch(err => { return err })//Fim do then               
          }
          parcelas.push({ totalReceitas: totalReceitas })
          parcelas.push({ totalDesconto: totalDesconto })
          parcelas.push({ totalLiquido: totalLiquido })
          res.status(200).json(parcelas)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}



//==============================================================================================================
//Receitas do ANO só VALOR
exports.buscarReceitasAnoSoValorES = async (req, res, next) => {
     console.log('..buscarReceitasAnoSoValorES..')
     try {
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          for (var i = 0; i < receitas.length; i++) {

               await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas').where('id_receita', '==', `${receitas[i].id}`).get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const anoParcela = dataCortada[2]//Pega ano

                              const ano = req.body.ano || anoAtual

                              if (anoParcela === ano) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              }//Fim if

                         })//Fim do ForEach

                    }).catch(err => { return err })//Fim do then               
          }
          parcelas.push({ totalReceitas: totalReceitas })
          parcelas.push({ totalDesconto: totalDesconto })
          parcelas.push({ totalLiquido: totalLiquido })
          res.status(200).json(parcelas)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//==============================================================================================================
//Receitas do ANO só VALOR EM ATRASO
exports.buscarReceitasAnoSoValorEmAtrasoES = async (req, res, next) => {
     console.log('..buscarReceitasAnoSoValorEmAtrasoES..')
     try {
          const receitas = await buscarReceitas(req.params.id_instituicao, req.params.id_escola)
          const parcelas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          for (var i = 0; i < receitas.length; i++) {

               await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas').where('id_receita', '==', `${receitas[i].id}`)
                    .where('status', '==', 'EM ATRASO').get()
                    .then(docs => {
                         docs.forEach(doc => {
                              const dataSalva = doc.data().data_vencimento
                              const dataCortada = dataSalva.split('/')
                              const anoParcela = dataCortada[2]//Pega ano
                              const ano = req.body.ano || anoAtual

                              if (anoParcela === ano) {
                                   totalReceitas = totalReceitas + doc.data().valor
                                   totalDesconto = totalDesconto + doc.data().desconto
                                   totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              }//Fim if

                         })//Fim do ForEach

                    }).catch(err => { return err })//Fim do then               
          }
          parcelas.push({ totalReceitas: totalReceitas })
          parcelas.push({ totalDesconto: totalDesconto })
          parcelas.push({ totalLiquido: totalLiquido })
          res.status(200).json(parcelas)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//==============================================================================================================
//Buscar todos os usuários com parcelas  EM ATRASO  da instituição
exports.buscarUsuariosComParcelasEmAtrasoES = async (req, res, next) => {
     console.log('...buscarUsuariosComParcelasEmAtraso...')
     try {
          const usuarios = await pegarUsuariosDaEscola(req.params.id_instituicao, req.params.id_escola)
          const parcelasEmAtraso = await pegarParcelasEmAtraso(req.params.id_instituicao)

          const retornaUsuarios = []


          for (var u = 0; u < usuarios.length; u++) {

               for (var r = 0; r < parcelasEmAtraso.length; r++) {

                    if (usuarios[u].id === parcelasEmAtraso[r].id_usuario) { //Pega todos os usuários que tem parcelas atrasadas
                         const usuario = {
                              id: usuarios[u].id,
                              nome: usuarios[u].nome,
                              email: usuarios[u].email
                         }
                         retornaUsuarios.push(usuario)
                    }

               }

          }

          res.status(200).json(retornaUsuarios)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//Pegar os usuarios da instituição
const pegarUsuariosDaEscola = async (id_instituicao, id_escola) => {
     console.log('...pegarUsuariosDaEscola...')
     try {
          const usuarios = []
          await db.collection('usuarios')
               .where('id_instituicao', '==', `${id_instituicao}`)
               .where('id_escola', '==', `${id_escola}`).get()
               .then(docs => {
                    if (docs.empty) {
                         throw 'Usuarios não encontrados'
                    } else {

                         docs.forEach(doc => {
                              const usuario = {
                                   id: doc.id,
                                   nome: doc.data().nome,
                                   email: doc.data().email
                              }

                              usuarios.push(usuario)
                         })


                    }

               })

          return usuarios
     } catch (e) {
          return `Erro ao buscar usuários, ${e}`
     }
}


//Pegar parcelas em atrado da instituição
const pegarParcelasEmAtraso = async (id_instituicao) => {
     console.log('...pegarParcelasEmAtraso...')
     try {
          const parcelas = []
          await db.collection('instituicoes').doc(`${id_instituicao}`)
               .collection('parcelas_receitas').where('status', '==', 'EM ATRASO').get()
               .then(docs => {
                    if (docs) {
                         docs.forEach(doc => {
                              const parcela = {
                                   id: doc.id,
                                   id_usuario: doc.data().id_usuario
                              }

                              parcelas.push(parcela)
                         })
                    } else {
                         throw 'Parcelas não encontradas'
                    }

               })

          return parcelas

     } catch (e) {
          return `Erro ao buscar parcelas, ${e}`
     }
}