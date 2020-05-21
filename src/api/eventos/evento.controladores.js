const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const eventoModelo = require('./evento.Modelo')



//Cadastrar tipos de Eventos

//Cadastrar Evento
exports.cadastrarTiposEvento = async (req, res, next) => {
  try {
    eventoModelo.cadastrarTiposEvento(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao cadastrar tipos de  evento!', e, res)
  }
}


//Busca tipos de evento
exports.buscarTiposEvento = async function (req, res, next) {
  try {
    eventoModelo.buscarTiposEvento(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar tipos de eventos!', e, res)
  }
}

//atualizar Tipos Eventos
exports.atualizarTipoEvento = async (req, res, next) => {
  try {
      eventoModelo.atualizarTipoEvento(req,res,next)

  } catch (e) {
       return pegaErros.manipulaErros('Erro ao atualizar tipo de  evento!', e, res)
  }
}
//deletar Tipos Eventos
exports.deletarTipoEvento = async (req, res, next) => {
  try {
     eventoModelo.deletarTipoEvento(req,res,next)

  } catch (e) {
       return pegaErros.manipulaErros('Erro ao deletar tipo de  evento!', e, res)
  }
}


//Cadastrar Evento
exports.cadastrarEvento = async (req, res, next) => {
  try {
    eventoModelo.cadastrarEvento(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao cadastrar evento!', e, res)
  }
}

//Buscar eventos do mês Instituição
exports.eventosDoMesI = async function (req, res, next) {
  try {
    eventoModelo.eventosDoMesI(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos da semana!', e, res)
  }
}
//Buscar eventos da semana Instituição
exports.eventosDaSemanaI = async function (req, res, next) {
  try {
    eventoModelo.eventosDaSemanaI(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos da semana!', e, res)
  }
}
//Buscar eventos do dia Instituição
exports.eventosDoDiaI = async function (req, res, next) {
  try {
    eventoModelo.eventosDoDiaI(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos da semana!', e, res)
  }
}
//Buscar eventos do mês Instituição
exports.eventosDoMesE = async function (req, res, next) {
  try {
    eventoModelo.eventosDoMesE(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos da semana!', e, res)
  }
}
//Buscar eventos da semana Instituição
exports.eventosDaSemanaE = async function (req, res, next) {
  try {
    eventoModelo.eventosDaSemanaE(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos da semana!', e, res)
  }
}
//Buscar eventos do dia Instituição
exports.eventosDoDiaE = async function (req, res, next) {
  try {
    eventoModelo.eventosDoDiaE(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos da semana!', e, res)
  }
}


//Busca um unico evento, necessário passar o id da escola
exports.buscarEventoPorID = async function (req, res, next) {
  try {
    eventoModelo.buscarEventoPorID(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar evento!', e, res)
  }
}

//Busca todos os eventos de uma escola
exports.buscarEventosPorEscola = async function (req, res, next) {
  try {
    eventoModelo.buscarEventosPorEscola(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
  }
}

//Busca todos os eventos de uma turma
exports.buscarEventosPorTurma = async function (req, res, next) {
  try {
    eventoModelo.buscarEventosPorTurma(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
  }
}


//Atualiza um evento de uma escola. Necessita passar o id da escola
exports.atualizarEvento = async function (req, res, next) {
  try {
    eventoModelo.atualizarEvento(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao buscar eventos!', e, res)
  }
}



//Deletar evento
exports.deletarEvento = async function (req, res, next) {
  try {
    eventoModelo.deletarEvento(req, res, next)
  } catch (e) {
    return pegaErros.manipulaErros('Erro ao deletar evento!', e, res)
  }

}


