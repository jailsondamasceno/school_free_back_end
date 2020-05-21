const db = require('../../config/firestore');
const modeloDisciplinas = require('../prof_disciplinas/disciplina.modelo')


//Todas as validações serão aplicadas aqui


//Criar Disciplina 
exports.cadastrarDisciplina = async (req, res, next) => {

  modeloDisciplinas.cadastrarDisciplina(req, res, next)
}

 //Buscar Disciplinas do curso
exports.buscarDisciplinasCurso = async function (req, res, next) {
  modeloDisciplinas.buscarDisciplinasCurso(req, res, next)
}
 //Buscar Professores da Instituição 
exports.professoresInstituicao = async function (req, res, next) {
  modeloDisciplinas.professoresInstituicao(req, res, next)
}
 //Buscar Professores da Escola 
exports.professoresEscola = async function (req, res, next) {
  modeloDisciplinas.professoresEscola(req, res, next)
}
 //Buscar Professores da Escola 
exports.professoresTurma = async function (req, res, next) {
  modeloDisciplinas.professoresTurma(req, res, next)
}


//Busca  Disciplina  por ID
exports.buscarDisciplinaPorID = async function (req, res, next) {

  modeloDisciplinas.buscarDisciplinaPorID(req, res, next)
}

//Busca  Disciplinas por professor
exports.buscarDisciplinasPorProf = async function (req, res, next) {

  modeloDisciplinas.buscarDisciplinasPorProf(req, res, next)
}
//Busca  PROFESSORES por disciplina
exports.buscarProfsPorDisciplina = async function (req, res, next) {

  modeloDisciplinas.buscarProfsPorDisciplina(req, res, next)
}


//Atualiza uma Disciplina 
exports.atualizarDisciplina = async function (req, res, next) {
  
  modeloDisciplinas.atualizarDisciplina(req, res, next)
  
} 



//Deletar uma Disciplina
exports.deletarDisciplina = async function (req, res, next) {

  modeloDisciplinas.deletarDisciplina(req, res, next)
} 


