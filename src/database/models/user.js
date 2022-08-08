const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  displayName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const users = sequelize.define('User', attributes, { tableName: 'Users', timestamps: false });
  users.associate = (models) => {
    users.hasMany(models.BlogPost, { key: 'userId', as: 'blogPosts' });
  };
  return users;
};