const db = require('../../config/firestore');
const horarioModelo = require('./horarios.Modelo')
const pegaErros = require('../../utilidades/manipulaErro');

//Cadastrar Horário
exports.cadastrarHorario = async (req, res, next) => {
     try {
          horarioModelo.cadastrarHorario(req, res, next)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar horário!', e, res)
     }
}

//Buscar todos os horários 
exports.horariosPorTurma = async function (req, res, next) {
     try{
     horarioModelo.horariosPorTurma(req, res, next)
} catch (e) {
     return pegaErros.manipulaErros('Erro ao buscar horários!', e, res)
}
}

//Buscar todos os horários do professor
exports.horariosPorProf = async function (req, res, next) {
     try{
     horarioModelo.horariosPorProf(req, res, next)
} catch (e) {
     return pegaErros.manipulaErros('Erro ao buscar horários!', e, res)
}
}

//Buscar todos os horáris por Dia da semana
exports.horariosPorDiaDaSemana = async function (req, res, next) {
     try {
          horarioModelo.horariosPorDiaDaSemana(req, res, next)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar horários!', e, res)
     }

}



//Buscar Horário  por Id 
exports.buscarHorarioPorID = async function (req, res, next) {
     try{
     horarioModelo.buscarHorarioPorID(req, res, next)
} catch (e) {
     return pegaErros.manipulaErros('Erro ao buscar horário!', e, res)
}
}

//Atualizar Horário
exports.atualizarHorario = async (req, res, next) => {
     try{
     horarioModelo.atualizarHorario(req, res, next)
} catch (e) {
     return pegaErros.manipulaErros('Erro ao atualizar horário!', e, res)
}
}

//Deletar Horário
exports.deletarHorario = async (req, res, next) => {
     try{
     horarioModelo.deletarHorario(req, res, next)
} catch (e) {
     return pegaErros.manipulaErros('Erro ao deletar horário!', e, res)
}
}

