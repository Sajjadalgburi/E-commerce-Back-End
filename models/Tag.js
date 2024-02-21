const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Tag extends Model {}

// Initializing Tag model with attributes and options
Tag.init(
  {
    // Define id attribute
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define tag_name attribute
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // Define model name
    modelName: "tag",
  }
);

// Export Tag model
module.exports = Tag;
