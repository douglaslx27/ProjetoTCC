const Resposta = require('../models/resposta');
const DataTime = require('./utils');

module.exports = {
    async store(request, response) {
        const { contato_usuario, id_pergunta, conteudo, tema } = request.body;
        let datapost = DataTime.obterData();
        await Resposta.salvar(contato_usuario, id_pergunta, conteudo, datapost, tema);

        return response.json({ contato_usuario, id_pergunta, conteudo, datapost, tema });
    },

    async get(request, response) {
        let { id_pergunta } = request.query;
        let lista = await Resposta.listarRespostas(id_pergunta);
        console.log(lista)
        return response.json(lista);
    }
}