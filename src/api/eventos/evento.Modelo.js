const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')

const dataAtual = momento.moment().format('DD/MM/YYYY')
const mesAtual = momento.moment().format('MM')
const anoAtual = momento.moment().format('YYYY')

//const add_um_mes = momento.moment().add(1, 'month').format('DD/MM/YYYY')


//cadastrar Tipos Eventos
exports.cadastrarTiposEvento = async (req, res, next) => {
     try {
          const tipo = {
               tipo: req.body.tipo,
               cor: req.body.cor
          };
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('tipos_evento').add(tipo);
          res.status(201).json(`Tipo de evento criado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar tipo de evento!', e, res)
     }
}
//cadastrar Tipos Eventos
exports.buscarTiposEvento = async (req, res, next) => {
     try {
          const tipos = [];
          const tip = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('tipos_evento').get()
          tip.forEach(doc => {
               const tipo = {
                    id: doc.id,
                    ...doc.data()
               };
               tipos.push(tipo)
          });

          res.status(200).json(tipos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar tipos de  eventos!', e, res)
     }
}
//atualizar Tipos Eventos
exports.atualizarTipoEvento = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('tipos_evento').doc(`${req.params.id_tipoEvento}`).update(req.body)
          res.status(200).json('Tipo de evento atualizado com sucesso!')

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar tipo de  evento!', e, res)
     }
}
//deletar Tipos Eventos
exports.deletarTipoEvento = async (req, res, next) => {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('tipos_evento').doc(`${req.params.id_tipoEvento}`).delete()
          res.status(200).json('Tipo de evento deletado com sucesso!')

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar tipo de  evento!', e, res)
     }
}

//cadastrar Evento
exports.cadastrarEvento = async (req, res, next) => {
     try {
          const data_i_Filtro = momento.moment(`${req.body.data_i_evento}`, 'DD/MM/YYYY').unix()
          const data_f_Filtro = momento.moment(`${req.body.data_f_evento}`, 'DD/MM/YYYY').unix()
          const evento = {
               id_instituicao: req.body.id_instituicao,
               para_escolas: req.body.para_escolas,
               id_tipo: req.body.id_tipo,
               ultima_atualizacao: dataAtual,
               titulo: req.body.titulo,
               descricao: req.body.descricao,
               url_imagem: req.body.url_imagem || '',
               local: req.body.local,
               data_i_evento: req.body.data_i_evento,
               data_f_evento: req.body.data_f_evento,
               data_i_eventoFiltro: data_i_Filtro.toString(),
               data_f_eventoFiltro: data_f_Filtro.toString()
          };
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('eventos').add(evento);
          res.status(201).json(`Evento criado com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar evento!', e, res)
     }

}

//Busca eventos do mês da  instituicao
exports.eventosDoMesI = async function (req, res, next) {
     try {
          const ultimoDiaDoMes = async (a, m) => { //Função para pegar o Último dia do Mês atual
               return new Date(a, m, 0).getDate()
          }

          const dia = await ultimoDiaDoMes(anoAtual, mesAtual) //Executamos a função e pegamos o último dia do mês

          const dataIncioAlternativa = `01/${mesAtual}/${anoAtual}` //geramos a data inicio da consulta
          const dataFimAlternativa = `${dia}/${mesAtual}/${anoAtual}` //geramos a data fim da consulta
          const d_i = req.body.dataInicio || dataIncioAlternativa //caso o usuario não envie a data ele pega a do mes atual
          const d_f = req.body.dataFim || dataFimAlternativa

          const dataInicio = momento.moment(`${d_i}`, 'DD/MM/YYYY').unix() //Tranformamos as datas em milisegundos
          const dataFim = momento.moment(`${d_f}`, 'DD/MM/YYYY').unix()

          const eventos = [];

         

          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('data_i_eventoFiltro', '>=', `${dataInicio}`)
               .where('data_i_eventoFiltro', '<=', `${dataFim}`).get()

          event.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });

          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}

//Busca eventos da semana instituicao
exports.eventosDaSemanaI = async function (req, res, next) {
     try {

          const startOfWeek = momento.moment().startOf('week').toDate()
          const inicioDaSemana = momento.moment(startOfWeek).unix()
          const endOfWeek = momento.moment().endOf('week').toDate();
          const fimDaSemana = momento.moment(endOfWeek).unix()
          const eventos = [];

          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('data_i_eventoFiltro', '>=', `${inicioDaSemana}`)
               .where('data_i_eventoFiltro', '<=', `${fimDaSemana}`).get()

          event.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });

          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}
//Busca eventos do dia instituição
exports.eventosDoDiaI = async function (req, res, next) {
     try {
          const hoje =  momento.moment(`${dataAtual}`,'DD/MM/YYYY').unix()

          const eventos = [];

          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos').where('data_i_eventoFiltro', '==', `${hoje}`).get()
          event.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });

          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}

//Busca eventos do mês da  escola
exports.eventosDoMesE = async function (req, res, next) {
     try {
          const ultimoDiaDoMes = async (a, m) => { //Função para pegar o Último dia do Mês atual
               return new Date(a, m, 0).getDate()
          }

          const dia = await ultimoDiaDoMes(anoAtual, mesAtual) //Executamos a função e pegamos o último dia do mês

          const dataIncioAlternativa = `01/${mesAtual}/${anoAtual}` //geramos a data inicio da consulta
          const dataFimAlternativa = `${dia}/${mesAtual}/${anoAtual}` //geramos a data fim da consulta
          const d_i = req.body.dataInicio || dataIncioAlternativa //caso o usuario não envie a data ele pega a do mes atual
          const d_f = req.body.dataFim || dataFimAlternativa

          const dataInicio = momento.moment(`${d_i}`, 'DD/MM/YYYY').unix() //Tranformamos as datas em milisegundos
          const dataFim = momento.moment(`${d_f}`, 'DD/MM/YYYY').unix()

          const eventos = [];

          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('para_escolas', 'array-contains', `${req.params.id_escola}`)
               .where('data_i_eventoFiltro', '>=', `${dataInicio}`)
               .where('data_i_eventoFiltro', '<=', `${dataFim}`).get()

          event.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });

          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}

//Busca eventos da semana escola
exports.eventosDaSemanaE = async function (req, res, next) {
     try {

          const startOfWeek = momento.moment().startOf('week').toDate()
          const inicioDaSemana = momento.moment(startOfWeek).unix()
          const endOfWeek = momento.moment().endOf('week').toDate();
          const fimDaSemana = momento.moment(endOfWeek).unix()

          const eventos = [];

          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('para_escolas', 'array-contains', `${req.params.id_escola}`)
               .where('data_i_eventoFiltro', '>=', `${inicioDaSemana}`)
               .where('data_i_eventoFiltro', '<=', `${fimDaSemana}`).get()


          event.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });

          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}
//Busca eventos do dia da escola
exports.eventosDoDiaE = async function (req, res, next) {
     try {
          const hoje =  momento.moment(`${dataAtual}`,'DD/MM/YYYY').unix()
          const eventos = [];

          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('para_escolas', 'array-contains', `${req.params.id_escola}`)
               .where('data_i_eventoFiltro', '==', `${hoje}`).get()
          event.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });

          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}


//Busca um unico evento, necessário passar o id da escola
exports.buscarEventoPorID = async (req, res, next) => {
     try {
          const event = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos').doc(`${req.params.id_evento}`).get()


          if (!doc.exists) {
               res.status(404).json('Evento não encontrado!');
          }
          const evento = {
               id: event.id,
               ...event.data()
          };
          res.status(200).json(evento);



     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar evento!', e, res)
     }
}

//Busca todos os eventos de uma escola
exports.buscarEventosPorEscola = async (req, res, next) => {
     try {
          const eventos = [];
          const evet = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('id_escola', '==', `${req.params.id_escola}`).get()

          evet.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });
          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }

}
//Busca todos por turma
exports.buscarEventosPorTurma = async (req, res, next) => {
     try {
          const eventos = [];
          const evet = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos')
               .where('id_turma', '==', `${req.params.id_turma}`).get()

          evet.forEach(doc => {
               const evento = {
                    id: doc.id,
                    ...doc.data()
               };
               eventos.push(evento)
          });
          return res.status(200).json(eventos)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
     }
}




exports.atualizarEvento = async function (req, res, next) {
     try {
          const d_i_e = momento.moment(`${req.body.data_i_evento}`, 'DD/MM/YYYY').unix()
          const d_f_e = momento.moment(`${req.body.data_f_evento}`, 'DD/MM/YYYY').unix()
          req.body.data_i_eventoFiltro = d_i_e.toString()
          req.body.data_f_eventoFiltro = d_f_e.toString()
          req.body.ultima_atualizacao = dataAtual

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos').doc(`${req.params.id_evento}`).update(req.body)


          return res.status(201).json(`Evento atualizado com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar evento!', e, res)
     }


}
exports.deletarEvento = async function (req, res, next) {
     try {
          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('eventos').doc(`${req.params.id_evento}`).delete()

          return res.status(201).json(`Evento deletado com sucesso`)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar evento!', e, res)
     }


}


