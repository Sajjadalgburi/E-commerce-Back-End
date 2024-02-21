const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

// Defining the ProductTag class which extends Model
class ProductTag extends Model {}

// Initializing the ProductTag model with attributes and options
ProductTag.init(
  {
    // ID attribute
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Product ID attribute with reference to the Product model
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    // Tag ID attribute with reference to the Tag model
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    // Sequelize connection
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

// Exporting the ProductTag model
module.exports = ProductTag;
