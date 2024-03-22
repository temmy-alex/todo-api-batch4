'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.Category, {as: "category", foreignKey: "category_id"})
      Article.belongsTo(models.User, {as: "user", foreignKey: "user_id"})
    }
  }
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE,
    deleted_by: DataTypes.STRING,
    modified_at: DataTypes.DATE,
    modified_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};