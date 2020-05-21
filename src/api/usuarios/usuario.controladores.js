const db = require('../../config/firestore');
const usuarioModelo = require('./usuario.modelo')
const pegaErros = require('../../utilidades/manipulaErro')

//Buscar CEP
exports.buscarCep = async (req,res,next) => {
    try {
        usuarioModelo.buscarCep(req,res,next)
    } catch (e) {
         return pegaErros.manipulaErros('Erro ao buscar cep', e, res)
    }
}
//Matricular 
exports.matricular = async (req, res, next) => {
    try {
        usuarioModelo.matricular(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao matricular o aluno! ')
    }
}
//Buscar perfis
exports.buscarPerfis = async function (req, res, next) {
    usuarioModelo.buscarPerfis(req, res, next)
}



//Cadastrar usuários
exports.cadastrarUsuario = async function (req, res, next) {
    try {
        if (req.body.perfil_atual == 'ADMIN') {
            usuarioModelo.cadastrarAdmin(req, res, next)
        } else if (req.body.perfil_atual == 'DIRETOR') {
            usuarioModelo.cadastrarDiretor(req, res, next)
        } else if (req.body.perfil_atual == 'PROFESSOR') {
            usuarioModelo.cadastrarProfessor(req, res, next)
        } else if (req.body.perfil_atual == 'FILIACAO') {
            usuarioModelo.cadastrarResponsavel(req, res, next)
        } else if (req.body.perfil_atual == 'RECEPCIONISTA') {
            usuarioModelo.cadastrarRecepcionista(req, res, next)
        } else if (req.body.perfil_atual == 'ALUNO') {
            usuarioModelo.cadastrarAluno(req, res, next)
        } else {
            res.status(400).json('Perfil inválido!')
        }
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao salvar usuário! ')
    }

};


//Pegar todos os usuarios da plataforma só valor
exports.buscarTodosUsuariosSoValor = async function (req, res, next) {
    try {
        usuarioModelo.buscarTodosUsuariosSoValor(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuários! ')
    }

}

//Pegar todos os usuarios da plataforma
exports.buscarTodosUsuarios = async function (req, res, next) {
    try {
        usuarioModelo.buscarTodosUsuarios(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuário! ')
    }

}


//Pegar todos os usuarios da instituição só valor
exports.buscarTodosUsuariosInstituicaoSoValor = async function (req, res, next) {
    try {
        usuarioModelo.buscarTodosUsuariosInstituicaoSoValor(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuários! ')
    }
}

//Pegar todos os usuarios da instituição
exports.buscarTodosUsuariosInstituicao = async function (req, res, next) {
    try {
        usuarioModelo.buscarTodosUsuariosInstituicao(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuário! ')
    }
}


//Pegar todos os usuarios da escola só valor
exports.buscarTodosUsuariosEscolaSoValor = async function (req, res, next) {
    try {
        usuarioModelo.buscarTodosUsuariosEscolaSoValor(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuários! ')
    }
}

//Pegar todos os usuarios da escla
exports.buscarTodosUsuariosEscola = async function (req, res, next) {
    try {
        usuarioModelo.buscarTodosUsuariosEscola(req, res, next)
    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuário! ')
    }
}

//Buscar usuario por id
exports.buscarUsuarioPorID = async function (req, res, next) {
    usuarioModelo.buscarUsuarioPorID(req, res, next)
}
//BUscar usuário por email ou cpf
exports.buscarUsuarioPorEmail_CPF = async function (req, res, next) {
    try {
        usuarioModelo.buscarUsuarioPorEmail_CPF(req, res, next)

    } catch (e) {
        return pegaErros.manipulaErros('Erro ao buscar usuário!', e, res)
    }
}

//Atualizar usuario
exports.atualizarUsuario = async function (req, res, next) {

    usuarioModelo.atualizarUsuario(req, res, next)

};

//Deletar usuário
exports.deletarUsuario = async function (req, res, next) {
    usuarioModelo.deletarUsuario(req, res, next)
}