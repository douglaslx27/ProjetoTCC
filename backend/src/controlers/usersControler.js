const Usuario = require('../models/usuario');
//const DataTime = require('./utils');

module.exports = {
    async store(request, response) {
        //let data_cadastro = DataTime.obterData();
        const { nome, sexo, contato, cidade, estado } = request.body;
        let tel = await Usuario.consultaTelefone(contato);

        if (!tel) {
            console.log(nome, sexo, contato, cidade, estado);
            await Usuario.salvar(nome, sexo, contato, cidade, estado);
        }

        return response.json({ nome, sexo, contato, cidade, estado });

    },
    async get(request, response) {
        const { contato } = request.query;
        let user = await Usuario.buscarUsuario(contato);

        return response.json(user);
    },

    async update(request, response) {
        //let data_cadastro = DataTime.obterData();
        const { nome, sexo, contato, cidade, estado, tema_de_dominio } = request.body;
        Usuario.update(nome, sexo, contato, cidade, estado, tema_de_dominio);

        return response.json({ nome, sexo, contato, cidade, estado, tema_de_dominio });
    },
    async delete(request, response) {
        const { contato } = request.body;
        Usuario.destroy(contato);

        return response.json({ message: 'Usuario deletado' })
    }
};