const Sequelize = require('sequelize');


sequelize.authenticate().then(() => {
    console.log('Conectado com sucesso');
}).catch((erro) => {
    console.log("Falha ao se conectar: " + erro)
});

const Usuario = sequelize.define('usuario', {
    nome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    telefone: {
        type: Sequelize.STRING
    }
},

    //{
    //   freezeTableName: true
    //},

    {
        timestamps: false
    }
);

//Usuario.sync();

(async () => {
    const user = Usuario.build({ nome: ' Cecília', idade: 3, telefone: '14680' });
    //await dough.save({ fields: ['nome', 'idade', 'telefone'] });
    console.log(user instanceof Usuario);
    console.log(user.nome);
    await user.save({ fields: ['nome', 'idade', 'telefone'] });
})();

//module.exports = sequelize;