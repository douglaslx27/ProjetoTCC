const Sequelize = require('sequelize');

const sequelize = new Sequelize('carechild', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

const Pergunta = sequelize.define('perguntas',
    {
        contato_usuario: {
            type: Sequelize.STRING(45)
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

//Pergunta.sync();

async function salvar(contato_usuario, conteudo, datapost, tema) {
    question = Pergunta.build({ contato_usuario, conteudo, datapost, tema });
    console.log(question instanceof Pergunta);
    console.log(question.contato_usuario);
    await question.save({ fields: ['contato_usuario', 'conteudo', 'datapost', 'tema'] })
};

async function listarPerguntas() {
    let lista = await Pergunta.findAll()

    lista = JSON.stringify(lista);
    lista = JSON.parse(lista);

    console.log(lista);
    return lista;
};

module.exports = { salvar, listarPerguntas };