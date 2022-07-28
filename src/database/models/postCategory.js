const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
}
module.exports = (sequelize) => {
  const postCategories = sequelize.define('PostCategory', attributes, { tableName: 'post-categories' });
  postCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: postCategories,
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: postCategories,
    });
  }
  return postCategories;
};