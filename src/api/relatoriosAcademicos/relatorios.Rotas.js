const {Router} = require('express')
const auth = require('../../config/auth')
const controladorRelatorios = require('./relatorios.Controladores')

const routes = new Router()

routes.get('/alunosComFiltro/:id_instituicao',auth,controladorRelatorios.buscarAlunos)
routes.get('/quantAlunosI/:id_instituicao',auth,controladorRelatorios.buscarAlunosDaInstituicaoSoValor)
//routes.get('/quantAlunosE/:id_instituicao',auth,controladorRelatorios.buscarAlunosDaInstituicaoSoValor)
routes.get('/alunosPorE/:id_instituicao/:id_escola',auth, controladorRelatorios.buscarAlunosPorEscola)
routes.get('/alunosPorCurso/:id_instituicao/:id_curso',auth, controladorRelatorios.buscarAlunosPorCurso)


module.exports = routes