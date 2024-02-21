const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // ID attribute
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Product name attribute
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Price attribute
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // Stock attribute
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
      defaultValue: 10,
    },
    // Category ID attribute with reference to the Category model
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // Model name
    modelName: "product",
  }
);

// Export the Product model
module.exports = Product;
