const db = require('../../config/firestore');
const pegaErros = require('../../utilidades/manipulaErro');
const temorisador = require('node-schedule')
const momento = require('../../utilidades/moment')

const dataAtual = momento.moment().format('DD/MM/YYYY')

const atualizarPeriodoDeTeste = temorisador.scheduleJob({ hour: 00, minute: 00 }, function () {
     diminuirPeriodoDeteste()
});

//Verificar Todas As inituiçoes comm período de teste e tirar um dia
const diminuirPeriodoDeteste = async () => {
     try{
          console.log('Chamou')
          const instituicoes=[]
          db.collection('instituicoes').where('dias_de_teste','>',0).get()
          .then(docs=>{
               docs.forEach(doc=>{ 
                    var d_teste = doc.data().dias_de_teste
                    d_teste = d_teste - 1        
                    const instituicao = {
                         id:doc.id,
                         dias_de_teste:d_teste
                    }
                    instituicoes.push(instituicao)
               })

               for(var i=0;i<instituicoes.length;i++){
                    console.log(instituicoes[i].dias_de_teste)
                    db.collection('instituicoes').doc(`${instituicoes[i].id}`).update({dias_de_teste:instituicoes[i].dias_de_teste})
               }
          })

     }catch(e){
          return pegaErros.manipulaErros('Erro ao cadastrar instituição!', e, res)
     }
}

//Cadastrar Instituicão
exports.cadastrarInstituicao = async (req, res, next) => {
     try {
          const instituicao = {
               id_criador: req.body.id_criador,
               plano_contratado: req.body.plano_contratado || '',
               status_plano: req.body.status_plano || '',
               data_criacao: dataAtual,
               ultima_atualizacao: dataAtual,
               nome_instituicao: req.body.nome_instituicao,
               razao_social: req.body.razao_social,
               cnpj: req.body.cnpj || '',
               pais: req.body.pais || 'Brasil',
               estado: req.body.estado,
               cidade: req.body.cidade,
               cep: req.body.cep,
               bairro: req.body.bairro,
               logradouro: req.body.logradouro,
               numero: req.body.numero
          };

          await db.collection('instituicoes').add(instituicao);
          res.status(201).json(`Instituição cadastrada com sucesso`)
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao cadastrar instituição!', e, res)
     }
}

//Buscar todas as Instituicões
exports.buscarInstituicoes = async function (req, res, next) {
     try {
          await db.collection('instituicoes').get()
               .then(snapshot => {
                    var instituicoes = [];
                    snapshot.forEach(doc => {
                         const instituicao = {
                              id: doc.id,
                              ...doc.data()
                         };
                         instituicoes.push(instituicao)
                    });
                    res.status(200).json(instituicoes)
               }).catch(err => { return err })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar Instituições!', e, res)
     }
}


//Buscar Instituicão por Id do Criador
exports.buscarInstituicoesPorIdCriador = async function (req, res, next) {
     try {
          const instituicaoRef = db.collection('instituicoes');
          const queryRef = instituicaoRef.where('id_criador', '==', `${req.params.id_criador}`);
          const getDoc = await queryRef.get()
               .then(snapshot => {
                    var instituicoes = [];
                    snapshot.forEach(doc => {
                         const instituicao = {
                              id: doc.id,
                              ...doc.data()
                         };
                         instituicoes.push(instituicao)
                    });
                    res.status(200).json(instituicoes);

               }).catch(err => { return err })

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar Instituições!', e, res)
     }
}

//Buscar Instituicão por Id 
exports.buscarInstituicaoPorID = async function (req, res, next) {
     try {
          var instituicaoRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`);
          var getDoc = instituicaoRef.get()
               .then(doc => {
                    if (!doc.exists) {
                         console.log(doc.data())
                         res.json('Instituição não encontrada!');
                    } else {
                         const instituicao = {
                              id: doc.id,
                              ...doc.data()
                         };
                         res.status(200).json(instituicao);
                    }
               }).catch(err => { return err });
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar instituição !', e, res)
     }
}
//Buscar Chaves api de pagamentopor Id 
exports.buscarChavesPagamento = async function (req, res, next) {
     try {
          var instituicaoRef = await db.collection('instituicoes').doc(`${req.params.id_instituicao}`);
          var getDoc = instituicaoRef.get()
               .then(doc => {
                    if (!doc.exists) {
                         res.json('Instituição não encontrada!');
                    } else {
                         const instituicao = {
                              pay_client_id:doc.data().pay_client_id,
                              pay_client_secret:doc.data().pay_client_secret
                                                     
                         };
                         res.status(200).json(instituicao);
                    }
               }).catch(err => { return err });
     } catch (e) {
          return pegaErros.manipulaErros('Erro ao buscar instituição !', e, res)
     }
}

//Atualizar instituição
exports.atualizarInstituicao = async (req, res, next) => {
     try {

          req.body.ultima_atualizacao = dataAtual

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).update(req.body);

          res.status(201).json(`Instituição atualizada com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao atualizar instituição!', e, res)
     }


}


//Deletar instituição
exports.deletarInstituicao = async (req, res, next) => {
     try {

          await db.collection('instituicoes').doc(`${req.params.id_instituicao}`).delete()

          res.status(201).json(`Instituição deletada com sucesso`)

     } catch (e) {
          return pegaErros.manipulaErros('Erro ao deletar instituição!', e, res)
     }

}