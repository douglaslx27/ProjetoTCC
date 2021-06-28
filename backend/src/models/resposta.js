const Sequelize = require('sequelize');

const sequelize = new Sequelize('carechild', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

const Resposta = sequelize.define('respostas',
    {
        contato_usuario: {
            type: Sequelize.STRING(45)
        },
        id_pergunta: {
            type: Sequelize.INTEGER
        },
        conteudo: {
            type: Sequelize.TEXT
        },
        datapost: {
            type: Sequelize.DATE
        },
        tema: {
            type: Sequelize.STRING(20)
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    },
)

//Resposta.sync();

async function salvar(contato_usuario, id_pergunta, conteudo, datapost, tema) {
    res = Resposta.build({ contato_usuario, id_pergunta, conteudo, datapost, tema });
    console.log(res instanceof Resposta);
    console.log(res.id);
    await res.save({ fields: ['contato_usuario', 'id_pergunta', 'conteudo', 'datapost', 'tema'] })
};

async function listarRespostas(id_pergunta) {
    let lista = await Resposta.findAll({
        where: {
            id_pergunta: id_pergunta
        }
    })

    lista = JSON.stringify(lista);
    lista = JSON.parse(lista);

    console.log(lista);
    return lista;
};

module.exports = { salvar, listarRespostas };