import Sequelize from 'sequelize';

const sequelize = new Sequelize('book_club', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  host: process.env.DB_HOST || 'localhost',
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import('./user'),
  Book: sequelize.import('./book'),
  Request: sequelize.import('./request'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
