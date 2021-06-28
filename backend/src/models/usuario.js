const Sequelize = require('sequelize');

const sequelize = new Sequelize('carechild', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

const Usuario = sequelize.define('usuarios',
    {
        nome: {
            type: Sequelize.STRING(45)
        },
        sexo: {
            type: Sequelize.STRING(1)
        },
        contato: {
            type: Sequelize.STRING(45)
        },
        cidade: {
            type: Sequelize.STRING(45)
        },
        estado: {
            type: Sequelize.STRING(45)
        },
        tema_de_dominio: {
            type: Sequelize.STRING(45)
        }
    },

    {
        freezeTableName: true,
        timestamps: false
    },
);
//Usuario.sync();
async function salvar(nome, sexo, contato, cidade, estado) {
    const user = Usuario.build({ nome, sexo, contato, cidade, estado });

    console.log(user instanceof Usuario);
    console.log(user.nome);
    await user.save({ fields: ['nome', 'sexo', 'contato', 'cidade', 'estado'] });
};

async function consultaTelefone(contato) {
    let cont = await Usuario.findAll({
        attributes: ['contato'],
        where: {
            contato: contato
        }
    });

    cont = JSON.stringify(cont);
    cont = JSON.parse(cont)

    return cont[0];

}

async function buscarUsuario(contato) {
    let user = await Usuario.findAll({
        attributes: [
            'nome',
            'sexo',
            'contato',
            'cidade',
            'estado'
        ],

        where: {
            contato: contato
        }
    });
    user = JSON.stringify(user);
    user = JSON.parse(user);

    return user;
}

async function update(nome, sexo, contato, cidade, estado, tema_de_dominio) {
    await Usuario.update(
        {
            nome: nome, sexo: sexo, cidade: cidade, estado: estado, tema_de_dominio: tema_de_dominio
        },
        {
            where: { contato: contato }
        }
    )
}

async function destroy(contato) {
    await Usuario.destroy(
        {
            where: {
                contato: contato
            }
        }
    )
}

module.exports = { salvar, consultaTelefone, buscarUsuario, update, destroy };

