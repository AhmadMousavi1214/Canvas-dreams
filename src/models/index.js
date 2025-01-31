const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Painting = require('./Painting')(sequelize, Sequelize.DataTypes);
const Order = require("./Order")(sequelize, Sequelize.DataTypes);

const models = { User, Painting, Order };

// Define associations
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Example associations
models.User.hasMany(models.Order, { foreignKey: 'userId' });
models.Order.belongsTo(models.User, { foreignKey: 'userId' });

models.Painting.hasMany(models.Order, { foreignKey: 'paintingId' });
models.Order.belongsTo(models.Painting, { foreignKey: 'paintingId' });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
