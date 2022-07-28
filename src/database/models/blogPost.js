const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
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
  published: { type: DataTypes.DATE },
  updated: {type: DataTypes.DATE },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const blogPosts = sequelize.define('BlogPost', attributes, { tableName: 'BlogPost' });
  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'id', as: 'user' });
  };
  return blogPosts;
};