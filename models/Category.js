const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

// Initializing the Category model with attributes and options
Category.init(
  {
    // ID attribute
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Category name attribute
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Sequelize connection
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // Model name
    modelName: "category",
  }
);

// Exporting the Category model
module.exports = Category;
