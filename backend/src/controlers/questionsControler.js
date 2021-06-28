const Pergunta = require('../models/pergunta');
const DataTime = require('./utils');

module.exports = {
    async index(request, response) {
        let lista = await Pergunta.listarPerguntas();
        console.log(lista)
        return response.json(lista);
    },

    async store(request, response) {
        const { contato_usuario, conteudo, tema } = request.body;
        let datapost = DataTime.obterData();
        await Pergunta.salvar(contato_usuario, conteudo, datapost, tema);

        return response.json({ contato_usuario, conteudo, datapost, tema });
    }
}