const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');


//Tipos tickets-------------------
exports.tiposTickets = async function(req, res, next){
     try{

          await db.collection('tipo_tickets').get()
          .then(docs=>{
               if(!docs){
                    res.status(404).json('Tipos de tickets não encontrados!')
               }else{
                    const tipos = [];
                    docs.forEach(doc=>{
                         tipo={
                              tipo:doc.data().tipo
                         }

                         tipos.push(tipo)
                    })

                    res.status(200).json(tipos)
               }
          })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar tipos de tickets', e, res)
     }
}



//Status tickets ---------------
exports.statusTickets = async function(req, res, next){
     try{

          await db.collection('status_tickets').get()
          .then(docs=>{
               if(!docs){
                    res.status(404).json('Tipos de status tickets não encontrados!')
               }else{
                    const status = [];
                    docs.forEach(doc=>{
                         st={
                              status:doc.data().status
                         }

                         status.push(st)
                    })

                    res.status(200).json(status)
               }
          })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar status de tickts ', e, res)
     }
}

//Criar Tickets-----------
exports.criarTicket = async (req, res, next) => {
     try {
          const ticket = {
               id_instituicao: req.body.id_instituicao,
               id_escola: req.body.id_escola,
               tipo: req.body.tipo,
               titulo: req.body.titulo,
               descricao: req.body.descricao,
               status: req.body.status || '',
               data_criacao: req.body.data_criacao
               //data_fechamento      
          };
          await db.collection('tickets').add(ticket);
          return res.status(201).json(`Ticket criado com sucesso!`)

     } catch (e) {
          res.status(400).json('Não foi possível criar o ticket')
     }
}

//Busca todos os Tickets de todas as escolas
exports.buscarTickets = async function (req, res, next) {
     try {
          await db.collection('tickets').get()
               .then(snapshot => {
                    var tickets = [];
                    snapshot.forEach(doc => {
                         const ticket = {
                              id: doc.id,
                              id_instituicao: doc.data().id_instituicao,
                              id_escola: doc.data().id_escola,
                              tipo: doc.data().tipo,
                              titulo: doc.data().titulo,
                              descricao: doc.data().descricao,
                              status: doc.data().status,
                              data_criacao: doc.data().data_criacao
                         };
                         tickets.push(ticket)
                    });
                    return res.status(200).json(tickets)
               })
               .catch(err => {
                    return res.status(400).json(err);
               });

     } catch (e) {
          res.status().json('Erro ao buscar o ticket')
     }
}


//Busca um unico Ticket, necessário passar o id da escola
exports.buscarTicketPorID = async function (req, res, next) {
     try {
          await db.collection('tickets').doc(`${req.params.id_ticket}`).get()
               .then(doc => {
                    if (!doc.exists) {
                         res.status(404).json('Ticket não encontrado!');
                    } else {
                         const ticket = {
                              id: doc.id,
                              id_instituicao: doc.data().id_instituicao,
                              id_escola: doc.data().id_escola,
                              tipo: doc.data().tipo,
                              titulo: doc.data().titulo,
                              descricao: doc.data().descricao,
                              status: doc.data().status,
                              data_criacao: doc.data().data_criacao
                         };
                         res.status(200).json(ticket);
                    }
               })
               .catch(e => {
                    res.status(500).json('Erro ao buscar o Ticket', e);
               });

     } catch (e) {
          res.status(400).json("Erro ao buscar o ticket!")
     }
}

//Busca todos os Tickets de uma escola
exports.buscarTicketsPorEscola = async function (req, res, next) {
     try {
          const ticketRef = db.collection('tickets')
          await ticketRef.where('id_escola', '==', `${req.params.id_escola}`).get()
               .then(docs => {
                    if (!docs) {
                         res.status(404).json('Tickets não encontrados!');
                    } else {
                         var tickets = [];
                         docs.forEach(doc => {
                              const ticket = {
                                   id: doc.id,
                                   id_instituicao: doc.data().id_instituicao,
                                   id_escola: doc.data().id_escola,
                                   tipo: doc.data().tipo,
                                   titulo: doc.data().titulo,
                                   descricao: doc.data().descricao,
                                   status: doc.data().status,
                                   data_criacao: doc.data().data_criacao
                              };
                              tickets.push(ticket)
                         });
                         res.status(200).json(tickets);
                    }

               })
               .catch(e => {
                    res.status(400).json('Erro ao buscar o Tickets', e);
               });
     } catch (e) {
          res.status(400).json('Erro ao buscar tickets')
     }
}


//Busca todos os Tickets por status
exports.buscarTicketsPorStatus = async function (req, res, next) {
     try {
          const ticketRef = db.collection('tickets')
          await ticketRef.where('status', '==', `${req.params.status}`).get()
               .then(docs => {
                    if (!docs) {
                         res.status(404).json('Tickets não encontrados!')
                    } else {
                         var tickets = [];
                         docs.forEach(doc => {
                              const ticket = {
                                   id: doc.id,
                                   id_instituicao: doc.data().id_instituicao,
                                   id_escola: doc.data().id_escola,
                                   tipo: doc.data().tipo,
                                   titulo: doc.data().titulo,
                                   descricao: doc.data().descricao,
                                   status: doc.data().status,
                                   data_criacao: doc.data().data_criacao
                              };
                              tickets.push(ticket)
                         });
                         res.status(200).json(tickets);
                    }
               })
               .catch(e => {
                    res.status(400).json('Erro ao buscar o Tickets', e);
               });
     } catch (e) {
          res.status(400).json('Erro ao buscar tickets')
     }
}

//Atualiza um Ticket de uma escola. Necessita passar o id da escola
exports.atualizarTicket = async function (req, res, next) {
     try {
          await db.collection('tickets').doc(`${req.params.id_ticket}`).update(req.body);

          res.status(201).json(`Ticket atualizado com sucesso`)

     } catch (e) {
          res.status(400).json('Erro ao atualizar ticket')
     }

}




exports.deletarTicket = async function (req, res, next) {
     try {

          await db.collection('tickets').doc(`${req.params.id_ticket}`).delete()

          return res.status(201).json(`Ticket deletado com sucesso`)

     } catch (e) {
          res.status(400).json(e)
     }

}


