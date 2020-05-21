const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const modeloTickets = require('./ticket.modelo')


//Buscar tipos Tickets
exports.tiposTickets = async function(req, res, next){
    modeloTickets.tiposTickets(req, res, next)
}

//Buscar Status Tickets
exports.statusTickets = async function(req, res, next){
    modeloTickets.statusTickets(req, res, next)
}

//Cadastrar tickets
exports.criarTicket = async (req, res,next) => {
    modeloTickets.criarTicket(req, res, next)
}

//Busca todos os Tickets de todas as escolas
exports.buscarTickets = async function (req, res, next) {
  modeloTickets.buscarTickets(req,res,next)
}


//Busca um unico Ticket, necessário passar o id da escola
exports.buscarTicketPorID = async function (req, res, next) {
    modeloTickets.buscarTicketPorID(req, res, next)
}

//Busca todos os Tickets de uma escola
exports.buscarTicketsPorEscola = async function (req, res, next) {
    modeloTickets.buscarTicketsPorEscola(req,res, next)
}

//Buscar tickets por status
exports.buscarTicketsPorStatus = async function(req,res, next){
  modeloTickets.buscarTicketsPorStatus(req, res, next)
}


//Atualiza um Ticket de uma escola. Necessita passar o id da escola
exports.atualizarTicket = async function (req, res, next) {
    modeloTickets.atualizarTicket(req, res, next)
}

//Deletar ticket
exports.deletarTicket = async function (req, res, next) {
    modeloTickets.deletarTicket(req, res, next)
}


