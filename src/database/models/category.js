const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
}
module.exports = (sequelize) => {
  const categories = sequelize.define('Category', attributes, { tableName: 'Categories', timestamps: false });
  return categories;
};