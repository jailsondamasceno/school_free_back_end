const { Router } = require('express');
const controladorTicket = require('./ticket.controladores')
const auth = require('../../config/auth')


const routes = new Router();

//Tipos tickets---------------------------------------------
routes.get('/tiposTickets',auth,controladorTicket.tiposTickets);
routes.get('/statusTickets',auth,controladorTicket.statusTickets);


//Tickets---------------------------------------------

routes.post('/cadastrar/:id_instituicao/:id_escola',auth,controladorTicket.criarTicket);
routes.get('/todos/:id_instituicao/:id_escola',auth,controladorTicket.buscarTickets);
routes.get('/ticket/:id_instituicao/:id_escola/:id_ticket',auth,controladorTicket.buscarTicketPorID);
routes.get('/ticketsPorEscola/:id_instituicao/:id_escola',auth,controladorTicket.buscarTicketsPorEscola);
routes.get('/ticketsPorStatus/:id_instituicao/:id_escola/:status',auth,controladorTicket.buscarTicketsPorStatus);
routes.patch('/atualizar/:id_instituicao/:id_escola/:id_ticket',auth,controladorTicket.atualizarTicket);
routes.delete('/deletar/:id_instituicao/:id_escola/:id_ticket',auth,controladorTicket.deletarTicket);



module.exports = routes;