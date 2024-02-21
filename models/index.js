// Import necessary models
const Product = require("./Product"); // Import Product model
const Category = require("./Category"); // Import Category model
const Tag = require("./Tag"); // Import Tag model
const ProductTag = require("./ProductTag"); // Import ProductTag model

// Relation Set 1: Category - Product relationship

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE", // If a Category is deleted, all associated Product instances should be deleted as well.
});

// Products belong to a Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Relation Set 2: Product - Tag relationship

// Products belong to many Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});

// Tags belong to many Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
