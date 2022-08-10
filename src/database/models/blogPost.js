const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  published: { type: DataTypes.DATE, defaultValue: new Date() },
  updated: {type: DataTypes.DATE, defaultValue: new Date() },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const blogPosts = sequelize.define('BlogPost', attributes, { tableName: 'BlogPosts', timestamps: false });
  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return blogPosts;
};