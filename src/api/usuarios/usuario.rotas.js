const { Router } = require('express');
const controladorUsuario = require('./usuario.controladores');

const autenticarUsuario = require('./authUsuario')
const auth = require('../../config/auth')



//============Rotas Livres========================================
const routes = new Router();

routes.post('/cadastro',autenticarUsuario.cadastroNaPlataforma);
routes.post('/login',autenticarUsuario.login);
routes.post('/validarToken',autenticarUsuario.validateToken);
routes.post('/recuperarSenha',autenticarUsuario.recuperaSenha)



//=======================Rotas Protegidas===============================//
routes.get('/buscarCep/:cep',auth,controladorUsuario.buscarCep)

routes.post('/trocarSenha/:id_usuario',auth,autenticarUsuario.trocarSenha)

routes.post('/matricular/:id_instituicao',auth,controladorUsuario.matricular)

routes.get('/usuariosDaPlataforma',auth,controladorUsuario.buscarTodosUsuariosSoValor)
routes.get('/usuariosInstituicao/:id_instituicao',auth,controladorUsuario.buscarTodosUsuariosInstituicaoSoValor)
routes.get('/usuariosEscola/:id_instituicao/:id_escola',auth,controladorUsuario.buscarTodosUsuariosEscolaSoValor)

routes.get('/perfis',auth,controladorUsuario.buscarPerfis)
routes.post('/cadastrar/:id_instituicao',auth,controladorUsuario.cadastrarUsuario)
routes.get('/todos',auth,controladorUsuario.buscarTodosUsuarios)
routes.get('/todosInstituicao/:id_instituicao',auth,controladorUsuario.buscarTodosUsuariosInstituicao)
routes.get('/todosEscola/:id_instituicao/:id_escola',auth,controladorUsuario.buscarTodosUsuariosEscola)
routes.get('/usuarioPorId/:id_instituicao/:id_usuario',auth,controladorUsuario.buscarUsuarioPorID)
routes.post('/usuarioPorEmailCpf/:id_instituicao',auth,controladorUsuario.buscarUsuarioPorEmail_CPF)
routes.patch('/atualizar/:id_instituicao/:id_usuario',auth,controladorUsuario.atualizarUsuario)
routes.patch('/deletar/:id_instituicao/:id_usuario',auth,controladorUsuario.deletarUsuario)


module.exports = routes;