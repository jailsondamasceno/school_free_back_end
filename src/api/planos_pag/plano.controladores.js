const db = require('../../config/firestore');
const modeloPlanos = require('../planos_pag/plano.modelo')


//contratação de planos
exports.contratarPlano = async (req,res,next)=>{
  try{
       modeloPlanos.contratarPlano(req,res,next)

  }catch(e){
       pegaErros.manipulaErros('Erro ao contratar o plano', e, res)
  }
}

//Criar Plano de Pagamento para a platarforma
exports.criarPlano = async (req, res, next) => {

  modeloPlanos.criarPlano(req, res, next)
}

//Buscar Planos de Pagamento da platarforma
exports.buscarPlanos = async function (req, res, next) {
  modeloPlanos.buscarPlanos(req, res, next)
}


//Busca um unico plano de pagamento
exports.buscarPlanoPorID = async function (req, res, next) {

  modeloPlanos.buscarPlanoPorID(req, res, next)
}


//Atualiza um plano de pagamento
exports.atualizarPlano = async function (req, res, next) {
  if(!req.body.nome){
    res.status(400).json('Nome do plano é obrigatório!')
  }else  if(!req.body.descricao){
    res.status(400).json('Descricão do plano é obrigatório!')
  }else  if(!req.body.estatus){
    res.status(400).json('Estatus do plano é obrigatório!')
  }else  if(req.body.n_max_parcelas<=0){
    res.status(400).json('Número de parcelas tem que ser maior que 0!')
  } else{

  modeloPlanos.atualizarPlano(req, res, next)
  }
}

//Ativar um plano de pagamento
exports.ativarPlano = async function (req, res, next) {
if(req.body.ativo!=true){
  res.status(400).json('Valor inválido!')
}else{
  modeloPlanos.ativarPlano(req, res, next)
}
}

//Intivar um plano de pagamento
exports.inativarPlano = async function (req, res, next) {
  if(req.body.ativo!=false){
    res.status(400).json('Valor inválido!')
  }else{
  modeloPlanos.inativarPlano(req, res, next)
  }
}

//Deletar um plano de pagamento
exports.deletarPlano = async function (req, res, next) {

  modeloPlanos.deletarPlano(req, res, next)
}


