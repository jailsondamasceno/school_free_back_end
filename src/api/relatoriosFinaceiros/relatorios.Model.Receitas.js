const db = require('../../config/firestore')
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')

const mesAtual = momento.moment().format('MM')
const anoAtual = momento.moment().format('YYYY')
const dataAtual = momento.moment().format('DD/MM/YYYY')

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
//== buscarUsuariosComParcelasEmAtraso (Repete se ou + parc) ==
//== pegarUsuariosDaInstituicao                              ==
//== pegarParcelasEmAtraso                                   ==
//=============================================================



//Função Principal  - Filtrar Receitas
exports.filtrarReceitas = async (req, res, next) => {
     if (req.body.id_categoria && req.body.id_subcategoria && req.body.status && req.body.dataInicio) {

          parcelasPorCateg_E_Subcat_ComDataFiltroEstatus(req, res, next)

     } else if (req.body.id_categoria && req.body.id_subcategoria && req.body.status && !req.body.dataInicio) {

          parcelasPorCateg_E_Subcat_SemDataFiltroEstatus(req, res, next)

     } else if (req.body.id_categoria && req.body.id_subcategoria && !req.body.status && req.body.dataInicio) {

          parcelasPorCateg_E_Subcat_ComDataFiltro(req, res, next)

     } else if (req.body.id_categoria && req.body.id_subcategoria && !req.body.status && !req.body.dataInicio) {

          parcelasPorCateg_E_Subcat_SemDataFiltro(req, res, next)

     } else if (req.body.id_categoria && !req.body.id_subcategoria && !req.body.status && !req.body.dataInicio) {

          parcelasPorCategoriaSemDataFiltro(req, res, next)
     } else if (req.body.id_categoria && !req.body.id_subcategoria && !req.body.status && req.body.dataInicio) {

          parcelasPorCategoriaComDataFiltro(req, res, next)

     } else if (req.body.id_categoria && !req.body.id_subcategoria && req.body.status && !req.body.dataInicio) {

          parcelasPorCategoriaSemDataFiltroEstatus(req, res, next)

     } else if (req.body.id_categoria && !req.body.id_subcategoria && req.body.status && req.body.dataInicio) {

          parcelasPorCategoriaComDataFiltroEstatus(req, res, next)
     } else if (!req.body.id_categoria && !req.body.id_subcategoria && req.body.status && !req.body.dataInicio) {

          parcelasDoMesSemDataFiltroComStatus(req, res, next)

     } else if (!req.body.id_categoria && !req.body.id_subcategoria && req.body.status && req.body.dataInicio) {

          parcelasDoMesComDataFiltroEstatus(req, res, next)

     } else if (!req.body.id_categoria && !req.body.id_subcategoria && !req.body.status && req.body.dataInicio) {

          parcelasDoMesComDataFiltro(req, res, next)
     } else {
          parcelasDoMesSemDataFiltro(req, res, next)
     }
}


/* Inicio Teste */

exports.buscarRec = async (req, res, next) => {
     try {
          const ultimoDiaDoMes = async (a, m) => { //Função para pegar o Último dia do Mês atual
               return new Date(a, m, 0).getDate()
          }

          const dia = await ultimoDiaDoMes(anoAtual, mesAtual) //Executamos a função e pegamos o último dia do mês

          const dataIncioAlternativa = `01/${mesAtual}/${anoAtual}` //geramos a data inicio da consulta
          const dataFimAlternativa = `${dia}/${mesAtual}/${anoAtual}` //geramos a data fim da consulta

          const parcelasDoMes = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0

          const d_i = req.body.dataInicio || dataIncioAlternativa //caso o usuario não envie a data ele pega a do mes atual
          const d_f = req.body.dataFim || dataFimAlternativa

          const dataInicio = momento.moment(`${d_i}`, 'DD/MM/YYYY').unix() //Tranformamos as datas em milisegundos
          const dataFim = momento.moment(`${d_f}`, 'DD/MM/YYYY').unix()
          
          var buscarParcelas = ''

          if(!req.body.id_escola && !req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 1 nehum filtro ale de data')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`).get()
          }

          if (req.body.id_escola && !req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 2 E')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`).get()
          }
          if (req.body.id_escola && !req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 3  E+C')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`).get()
          }
          if (req.body.id_escola && !req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 4  E+C+SB')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`)
                    .where('id_subcategoria','==',`${req.body.id_subcategoria}`).get()
          }
          if (!req.body.id_escola && req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 5 S')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`).get()
          }
          if (!req.body.id_escola && req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 6 S+C')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`).get()
          }
          if (!req.body.id_escola && req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 7 S+C+SB')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria','==',`${req.body.id_categoria}`)
                    .where('id_subcategoria','==',`${req.body.id_subcategoria}`).get()
          }
          
          if (!req.body.id_escola && !req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 8 C')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`).get()
          }

          if (req.body.id_escola && req.body.status && !req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 9 E+S')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('status', '==', `${req.body.status}`).get()
          }
          if (req.body.id_escola && req.body.status && req.body.id_categoria && !req.body.id_subcategoria) {
               console.log('If 10 E+S+C')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`).get()
          }
          if (!req.body.id_escola && !req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 11 C+SB')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`)
                    .where('id_subcategoria', '==', `${req.body.id_subcategoria}`).get()
          }
          if (req.body.id_escola && req.body.status && req.body.id_categoria && req.body.id_subcategoria) {
               console.log('If 12 E+S+C+SB')
               buscarParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                    .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                    .where('id_escola', '==', `${req.body.id_escola}`)
                    .where('status', '==', `${req.body.status}`)
                    .where('id_categoria', '==', `${req.body.id_categoria}`)
                    .where('id_subcategoria', '==', `${req.body.id_subcategoria}`).get()
          }          


          buscarParcelas.forEach(parce => {
               parcelasDoMes.push(parce.data())
          })


          Promise.all(parcelasDoMes)

          const valores = {}
          valores.totalReceitas = totalReceitas
          valores.totalDesconto = totalDesconto
          valores.totalLiquido = totalLiquido
          const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }

          res.status(200).json(parcelasProntas)



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar parcerlas!', e, res)
     }
}

const setarUrlRec = async (body) => {
     try {
          console.log('Chamou setar')
          const dataInicio = momento.moment(`${body.dataInicio}`, 'DD/MM/YYYY').unix() || dataAtual
          const dataFim = momento.moment(`${body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio

          var buscarParcelas = db.collection('instituicoes').doc(`${body.params.id_instituicao}`)
               .collection('parcelas_receitas')
               .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
               .where('data_vencimentoFiltro', '<=', `${dataFim}`)


          if (body.id_escola) {
               buscarParcelas = buscarParcelas.where('id_escola', '==', `${body.id_escola}`)
          }
          if (body.status) {
               buscarParcelas = buscarParcelas.where('status', '==', `${body.status}`)
          }
          if (body.id_categoria) {
               buscarParcelas = buscarParcelas.where('id_categoria', '==', `${body.id_categoria}`)
          }
          if (id_subcategoria) {
               buscarParcelas = buscarParcelas.where('id_subcategoria', '==', `${body.id_subcategoria}`)
          }


          return buscarParcelas.get()


     } catch (e) {
          return e
     }
}

/* Fim do Teste */


//==================== Funções de filtro =========================//

//Buscar Receitas da escola passando o ID da instituicao e da escola
//=======================================================================================
const buscarReceitas = async (id_instituicao) => {
     console.log('...buscarReceitasInstituição..')
     try {
          const receitas = []
          const buscaReceitas = await db.collection('instituicoes').doc(`${id_instituicao}`)
               .collection('receitas').get()
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

//=======================================================================================
//Função que buscar todas as parcelas Do Mês atual sem filtro de data e status
const parcelasDoMesSemDataFiltro = async (req, res, next) => {
     try {
          console.log('..parcelasDoMesSemDataFiltro..')
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');

          const parcelasDoMes = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          buscaParcelas.get()
               .then(docs => {
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data_vencimento
                         const dataCortada = dataSalva.split('/')
                         const mesParcela = dataCortada[1]//Pega o mês
                         const anoParcela = dataCortada[2]//pega o ano

                         if (mesParcela === mesAtual && anoParcela === anoAtual) {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              parcelasDoMes.push(parcela)

                         }//Fim if

                    })//Fim ForEach

                    const valores = {}
                    valores.totalReceitas = totalReceitas
                    valores.totalDesconto = totalDesconto
                    valores.totalLiquido = totalLiquido
                    const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                    res.status(200).json(parcelasProntas)

               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }

}
//============================================================================================================
//Função que buscar todas as parcelas Do Mês atual sem filtro de data e Com status
const parcelasDoMesSemDataFiltroComStatus = async (req, res, next) => {
     console.log('..parcelasDoMesSemDataFiltroComStatus..')
     try {

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');

          const parcelasdoMes = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          buscaParcelas.where('status', '==', `${req.body.status}`).get()
               .then(docs => {
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data_vencimento
                         const dataCortada = dataSalva.split('/')
                         const mesParcela = dataCortada[1]//Pega o mês
                         const anoParcela = dataCortada[2]

                         if (mesParcela === mesAtual && anoParcela === anoAtual) {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

                              const parcela = {
                                   id: doc.id,
                                   ...doc.data()
                              }
                              parcelasdoMes.push(parcela)

                         }//Fim if

                    })//Fim ForEach

                    const valores = {}
                    valores.totalReceitas = totalReceitas
                    valores.totalDesconto = totalDesconto
                    valores.totalLiquido = totalLiquido
                    const parcelasProntas = { parcelas: parcelasdoMes, valores: valores }
                    res.status(200).json(parcelasProntas)

               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }

}

//============================================================================================================
//Função que buscar todas as parcelas //Somente aplicando o filtro de datas
const parcelasDoMesComDataFiltro = async (req, res, next) => {
     try {

          const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
          const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');

          const parcelasdoMes = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          buscaParcelas.where('data_vencimentoFiltro', '>=', `${dataInicio}`)
               .where('data_vencimentoFiltro', '<=', `${dataFim}`)
               .get()
               .then(docs => {
                    docs.forEach(doc => {

                         totalReceitas = totalReceitas + doc.data().valor
                         totalDesconto = totalDesconto + doc.data().desconto
                         totalLiquido = totalLiquido + doc.data().valor_a_pagar
                         const parcela = {
                              id: doc.id,
                              ...doc.data()
                         }
                         parcelasdoMes.push(parcela)

                    })

                    const valores = {}
                    valores.totalReceitas = totalReceitas
                    valores.totalDesconto = totalDesconto
                    valores.totalLiquido = totalLiquido
                    const parcelasProntas = { parcelas: parcelasdoMes, valores: valores }
                    res.status(200).json(parcelasProntas)
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//============================================================================================================
//Função que buscar todas as parcelas //Somente aplicando o filtro de datas e Status
const parcelasDoMesComDataFiltroEstatus = async (req, res, next) => {
     try {
          console.log('...parcelasDoMesComDataFiltroEstatus...')

          const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
          const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');

          const parcelasdoMes = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          buscaParcelas.where('status', '==', `${req.body.status}`)
               .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
               .where('data_vencimentoFiltro', '<=', `${dataFim}`)
               .get()
               .then(docs => {
                    docs.forEach(doc => {
                         totalReceitas = totalReceitas + doc.data().valor
                         totalDesconto = totalDesconto + doc.data().desconto
                         totalLiquido = totalLiquido + doc.data().valor_a_pagar
                         const parcela = {
                              id: doc.id,
                              ...doc.data()
                         }

                         parcelasdoMes.push(parcela)

                    })

                    const valores = {}
                    valores.totalReceitas = totalReceitas
                    valores.totalDesconto = totalDesconto
                    valores.totalLiquido = totalLiquido
                    const parcelasProntas = { parcelas: parcelasdoMes, valores: valores }
                    res.status(200).json(parcelasProntas)
               })

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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');
          const receitas = [] //receitas obtidas
          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`).get() //buscamos todas as receitas da categria
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasdoMes = [] //Guardamos as parcelas
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
                                             parcelasdoMes.push(parcela)

                                        }//Fim if

                                   })//Fim ForEach
                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasdoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}


//============================================================================================================
//Buscar parcelas do mês aplicando filtro de Categoria e sem filtro de  data e com Status
const parcelasPorCategoriaSemDataFiltroEstatus = async (req, res, next) => {
     try {
          console.log('..parcelasPorCategoriaSemDataFiltroEstatus...')

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');
          const receitas = [] //receitas obtidas
          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`).get() //buscamos todas as receitas da categria
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
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
                                             parcelasDoMes.push(parcela)

                                        }//Fim if

                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');
          const receitas = [] //receitas obtidas
          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`).get() //buscamos todas as receitas da categria
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
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
                              .get()
                              .then(docs => {
                                   docs.forEach(doc => {
                                        totalReceitas = totalReceitas + doc.data().valor
                                        totalDesconto = totalDesconto + doc.data().desconto
                                        totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                        const parcela = {
                                             id: doc.id,
                                             ...doc.data()
                                        }
                                        parcelasDoMes.push(parcela)



                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');
          const receitas = [] //receitas obtidas
          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`).get() //buscamos todas as receitas da categria
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
                    var totalReceitas = 0
                    var totalDesconto = 0
                    var totalLiquido = 0

                    for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
                         // então buscamos todas as parcelas dessa receita 
                         const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
                         const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio
                         buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                              .where('status', '==', `${req.body.status}`)
                              .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                              .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                              .get()
                              .then(docs => {
                                   docs.forEach(doc => {
                                        totalReceitas = totalReceitas + doc.data().valor
                                        totalDesconto = totalDesconto + doc.data().desconto
                                        totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                        const parcela = {
                                             id: doc.id,
                                             ...doc.data()
                                        }
                                        parcelasDoMes.push(parcela)



                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');

          const receitas = [] //receitas obtidas

          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`) //buscamos todas as receitas da categria
               .where('id_subcategoria', '==', `${req.body.id_subcategoria}`)
               .get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
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
                                             parcelasDoMes.push(parcela)

                                        }//Fim if

                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');

          const receitas = [] //receitas obtidas

          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`) //buscamos todas as receitas da categria
               .where('id_subcategoria', '==', `${req.body.id_subcategoria}`)
               .get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
                    var totalReceitas = 0
                    var totalDesconto = 0
                    var totalLiquido = 0

                    for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
                         // então buscamos todas as parcelas dessa receita 
                         b = buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                         b1 = b.where('status', '==', `${req.body.status}`)
                         b1.get()
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
                                             parcelasDoMes.push(parcela)

                                        }//Fim if

                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');
          const receitas = [] //receitas obtidas
          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`) //buscamos todas as receitas da categria
               .where('id_subcategoria', '==', `${req.body.id_subcategoria}`)
               .get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
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
                              .get()
                              .then(docs => {
                                   docs.forEach(doc => {
                                        totalReceitas = totalReceitas + doc.data().valor
                                        totalDesconto = totalDesconto + doc.data().desconto
                                        totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                        const parcela = {
                                             id: doc.id,
                                             ...doc.data()
                                        }
                                        parcelasDoMes.push(parcela)



                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




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
          const buscaReceitas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('receitas');
          const receitas = [] //receitas obtidas
          buscaReceitas.where('id_categoria', '==', `${req.body.id_categoria}`) //buscamos todas as receitas da categria
               .where('id_subcategoria', '==', `${req.body.id_subcategoria}`)
               .get()
               .then(docs => {
                    docs.forEach(doc => {
                         const receita = {
                              id: doc.id,
                              nome: doc.data().nome
                         }
                         receitas.push(receita)
                    }) //fim do forEach

                    const parcelasDoMes = [] //Guardamos as parcelas
                    var totalReceitas = 0
                    var totalDesconto = 0
                    var totalLiquido = 0

                    for (var i = 0; i < receitas.length; i++) { //Pegamos todas a receitas obtidas da categoria escolhida
                         // então buscamos todas as parcelas dessa receita 
                         const dataInicio = momento.moment(`${req.body.dataInicio}`, 'DD/MM/YYYY').unix()
                         const dataFim = momento.moment(`${req.body.dataFim}`, 'DD/MM/YYYY').unix() || dataInicio
                         buscaParcelas.where('id_receita', '==', `${receitas[i].id}`)
                              .where('status', '==', `${req.body.status}`)
                              .where('data_vencimentoFiltro', '>=', `${dataInicio}`)
                              .where('data_vencimentoFiltro', '<=', `${dataFim}`)
                              .get()
                              .then(docs => {
                                   docs.forEach(doc => {
                                        totalReceitas = totalReceitas + doc.data().valor
                                        totalDesconto = totalDesconto + doc.data().desconto
                                        totalLiquido = totalLiquido + doc.data().valor_a_pagar

                                        const parcela = {
                                             id: doc.id,
                                             ...doc.data()
                                        }
                                        parcelasDoMes.push(parcela)



                                   })//Fim ForEach

                                   const valores = {}
                                   valores.totalReceitas = totalReceitas
                                   valores.totalDesconto = totalDesconto
                                   valores.totalLiquido = totalLiquido
                                   const parcelasProntas = { parcelas: parcelasDoMes, valores: valores }
                                   res.status(200).json(parcelasProntas)


                              })//Fim do 2º then
                    } //fim do for


               })//Fim do 1º then.




     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}




//=================================FUNÇÕES INDEPENDENTES========================================================
//==============================================================================================================
//Receitas do Mês só VALOR Se não mandar o Mês pega o Mês Atual
exports.buscarReceitasMesSoValor = async (req, res, next) => {
     try {
          console.log('..buscarReceitasMesSoValor..')
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');

          const valorReceitas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
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


//==============================================================================================================
//Receitas do Mês só VALOR EM ATRASO Se não mandar o Mês pega o Mês Atual
exports.buscarReceitasMesSoValorEmAtraso = async (req, res, next) => {
     try {
          console.log('..buscarReceitasMesSoValorEmAtraso..')
          const valorReceitas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          b = buscaParcelas.where('status', '==', 'EM ATRASO')
          b.get()
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

                         }//Fim if

                    })//Fim ForEach

                    valorReceitas.push({ totalReceitas: totalReceitas })
                    valorReceitas.push({ totalDesconto: totalDesconto })
                    valorReceitas.push({ totalLiquido: totalLiquido })
                    res.status(200).json(valorReceitas)

               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas em atraso!', e, res)
     }
}



//==============================================================================================================
//Receitas do ANO só VALOR
exports.buscarReceitasAnoSoValor = async (req, res, next) => {
     try {

          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');

          const valorReceitas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          buscaParcelas.get()
               .then(docs => {
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data_vencimento
                         const dataCortada = dataSalva.split('/')
                         const anoParcela = dataCortada[2] // Pega Ano

                         const ano = req.body.ano || anoAtual

                         if (anoParcela === ano) {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

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


//==============================================================================================================
//Receitas do ANO só VALOR EM ATRASO
exports.buscarReceitasAnoSoValorEmAtraso = async (req, res, next) => {
     try {
          const valorReceitas = []
          var totalReceitas = 0
          var totalDesconto = 0
          var totalLiquido = 0
          const buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('parcelas_receitas');
          buscaParcelas.where('status', '==', 'EM ATRASO').get()
               .then(docs => {
                    docs.forEach(doc => {
                         const dataSalva = doc.data().data_vencimento
                         const dataCortada = dataSalva.split('/')
                         const anoParcela = dataCortada[2] // Pega Ano

                         const ano = req.body.ano || anoAtual

                         if (anoParcela === ano) {
                              totalReceitas = totalReceitas + doc.data().valor
                              totalDesconto = totalDesconto + doc.data().desconto
                              totalLiquido = totalLiquido + doc.data().valor_a_pagar

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

//==============================================================================================================
//Buscar Receitas Por Curso e Por Turma
exports.buscarReceitasPorCursoETurma = async (req, res, next) => {
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
                    .where('id_curso', '==', `${req.params.id_curso}`)
                    .where('id_turma', '==', `${req.body.id_turma}`)
          } else if (req.body.status && !req.body.id_turma) {

               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_curso', '==', `${req.params.id_curso}`)
                    .where('status', '==', `${req.body.status}`)
          } else if (req.body.id_turma && req.body.status) {

               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
                    .where('id_curso', '==', `${req.params.id_curso}`)
                    .where('id_turma', '==', `${req.body.id_turma}`)
                    .where('status', '==', `${req.body.status}`)
          } else {

               buscaParcelas = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
                    .collection('parcelas_receitas')
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

                    const valores = {}
                    valores.totalReceitas = totalReceitas
                    valores.totalDesconto = totalDesconto
                    valores.totalLiquido = totalLiquido
                    const parcelasProntas = { parcelas: valorReceitas, valores: valores }
                    res.status(200).json(parcelasProntas)
               })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar receitas!', e, res)
     }
}



//==============================================================================================================
//Buscar todos os usuários com parcelas  EM ATRASO  da instituição
exports.buscarUsuariosComParcelasEmAtraso = async (req, res, next) => {
     console.log('...buscarUsuariosComParcelasEmAtraso...')
     try {
          const usuarios = await pegarUsuariosDaInstituicao(req.params.id_instituicao)
          console.log(usuarios)
          const parcelasEmAtraso = await pegarParcelasEmAtraso(req.params.id_instituicao)
          // console.log(parcelasEmAtraso)

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
const pegarUsuariosDaInstituicao = async (id_instituicao) => {
     try {
          console.log('...pegarUsuariosDaInstituicao...')
          const usuarios = []
          await db.collection('usuarios').where('id_instituicao', '==', `${id_instituicao}`).get()
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
     try {
          console.log('...pegarParcelasEmAtraso...')
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