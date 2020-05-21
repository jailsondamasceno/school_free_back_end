const rotaUsuarios = require('./usuarios/usuario.rotas');
const rotaInstituicoes = require('./instituicoes/instituicao.rotas');
const rotasEscolas = require('./escolas/escola.rotas')
const rotasCursos = require('./cursos/curso.rotas')
const rotasTurmas = require('./turmas/turma.rotas')
const rotasHorarios = require('./horarios/horarios.Rotas')
const rotasDisciplinas = require('./prof_disciplinas/disciplina.rotas')
const rotaEventos = require('./eventos/evento.rotas');
const rotaTickets = require('./tickets/ticket.rotas')
const rotaPlanos = require('./planos_pag/plano.rotas');
const rotaCategoriasReceitas = require('./categorias_receitas/categoria.rotas')
const rotaCategoriasDespesas = require('./categorias_despesas/categoria.rotas')
const rotaProd_Servicos = require('./produtos_servicos/prod_serv.Rotas')
const rotasLoja = require('./loja/loja.Rotas')
const rotaFormPag = require('./formas_pagamento/form_pag.rotas')
const rotaReceitas = require('./receitas/receitas.Rotas')
const rotaDespesas = require('./despesas/despesas.Rotas')
const rotaAvaliacoes = require('./avaliacoes/avaliacoes.Rotas')
const rotaRelatoriosAc = require('./relatoriosAcademicos/relatorios.Rotas')
const rotaRelatoriosFin = require('./relatoriosFinaceiros/relatorios.Rotas')
const rotaEmails = require('./emails/email.Rotas')




module.exports = app => {

    app.use('/api/v1/usuarios', rotaUsuarios);
    app.use('/api/v1/instituicoes', rotaInstituicoes);
    app.use('/api/v1/escolas', rotasEscolas);
    app.use('/api/v1/cursos', rotasCursos);
    app.use('/api/v1/turmas', rotasTurmas);
    app.use('/api/v1/horarios', rotasHorarios);
    app.use('/api/v1/disciplinas', rotasDisciplinas);
    app.use('/api/v1/eventos', rotaEventos);
    app.use('/api/v1/tickets', rotaTickets);
    app.use('/api/v1/planos', rotaPlanos);
    app.use('/api/v1/categoriasReceitas', rotaCategoriasReceitas);
    app.use('/api/v1/categoriasDespesas', rotaCategoriasDespesas);
    app.use('/api/v1/prod_servicos', rotaProd_Servicos);
    app.use('/api/v1/loja', rotasLoja);
    app.use('/api/v1/formasDePagamento', rotaFormPag);
    app.use('/api/v1/receitas', rotaReceitas);
    app.use('/api/v1/despesas', rotaDespesas);
    app.use('/api/v1/avaliacoes', rotaAvaliacoes);
    app.use('/api/v1/relatoriosAcademicos', rotaRelatoriosAc)
    app.use('/api/v1/relatoriosFinanceiros', rotaRelatoriosFin)
    app.use('/api/v1/emails', rotaEmails)



};
