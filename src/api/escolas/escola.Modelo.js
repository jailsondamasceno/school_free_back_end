const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const momento = require('../../utilidades/moment')

const dataAtual = momento.moment().format('DD/MM/YYYY')

//categorias escolas
exports.categoriasEscolas= async(req, res, next)=>{
     try{
          const categorias =[]
         await db.collection('categorias_escolas').get()
         .then(docs=>{
              docs.forEach(doc=>{
                   var categoria ={
                        id:doc.id,
                        ...doc.data()
                   }
                   categorias.push(categoria)
              })
              res.status(200).json(categorias)
         })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar categorias!', e, res)
     }
}
//categorias escolas por id
exports.categoriasEscolasPorID= async(req, res, next)=>{
     try{

         await db.collection('categorias_escolas').doc(`${req.params.id_categoria}`).get()
         .then(doc=>{
                           
              res.status(200).json(doc.data())
         })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao buscar categorias!', e, res)
     }
}

//Cadastrar Escola
exports.cadastrarEscola = async (req, res, next) => {
     try {
          const escola = {
               id_instituicao: req.body.id_instituicao,
               nome_escola: req.body.nome_escola,
               cobranca_automatica:req.body.cobranca_automatica,
               data_cadastro: dataAtual,
               ultima_atualizacao: dataAtual,
               cnpj: req.body.cnpj,
               categoria: req.body.categoria,
               pais: req.body.pais,
               estado: req.body.estado,
               cidade: req.body.cidade,
               bairro: req.body.bairro,
               cep:req.body.cep,
               logradouro: req.body.logradouro,
               numero: req.body.numero,
          };

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('escolas').add(escola);
           res.status(201).json(`Escola criada com sucesso!`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar escolas!', e, res)
     }
}

//Buscar todas as Escolas de uma instituicão
exports.buscarEscolas = async function (req, res, next) {
     try{

     await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).collection('escolas').get()
          .then(snapshot => {
               var escolas = [];
               snapshot.forEach(doc => {
                    const escola = {
                         id: doc.id,
                        ...doc.data()
                    };
                    escolas.push(escola)
               });
                res.status(200).json(escolas)
          }).catch(err => { return  err });
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar escolas!', e, res)
     }
}



//Buscar Escola  por Id 
exports.buscarEscolaPorID = async function (req, res, next) {
     try{
     const escolaRerf = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
          .collection('escolas').doc(`${req.params.id_escola}`);
     escolaRerf.get()
          .then(doc => {
               if (!doc.exists) {
                    console.log(doc.data())
                    res.json('Instituição não encontrada!');
               } else {
                    const escola = {
                         id: doc.id,
                         ...doc.data()
                    };
                    res.status(200).json(escola);
               }
          }).catch(err => {return err });
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar escola!', e, res)
     }
}

//Atualizar escola
exports.atualizarEscola = async (req, res, next) => {
     try {
          req.body.ultima_atualizacao = dataAtual

          db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('escolas').doc(`${req.params.id_escola}`).update(req.body);

          res.status(201).json(`Escola atualizada com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar escola!', e, res)
     }

}


//Deletar escola
exports.deletarEscola = async (req, res, next) => {
     try {
          
          db.collection('instituicoes').doc(`${req.params.id_instituicao}`)
               .collection('escolas').doc(`${req.params.id_escola}`).delete()

           res.status(201).json(`Escola deletada com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar escola!', e, res)
     }

}