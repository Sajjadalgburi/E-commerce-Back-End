const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// GET method to get everything from the Product model
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database including associated tags and categories
    const productData = await Product.findAll({
      include: [{ model: Tag }, { model: Category }],
    });
    // Send a 200 OK response along with the product data
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    // If an error occurs, log the error and send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

// GET method for a sepcific Product id
router.get("/:id", async (req, res) => {
  try {
    // Find the product by its primary key (id), including associated tags and categories
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Tag }, { model: Category }],
    });
    // Send a 200 OK response along with the product data
    res.status(200).json(productData);
  } catch (err) {
    // If an error occurs during the database query, log the error to the console
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

// POST method for user to post a product
router.post("/", async (req, res) => {
  try {
    const { product_name, price, stock, tagIds } = req.body;

    // Create the product
    const product = await Product.create({
      product_name,
      price,
      stock,
    });

    // Associate tags with the product using ProductTag
    if (tagIds && tagIds.length > 0) {
      const tags = await Tag.findAll({
        where: {
          id: tagIds,
        },
      });

      await product.addTags(tags);
    }

    // Fetch the created product with associated tags
    const productWithTags = await Product.findByPk(product.id, {
      include: Tag,
    });

    res.status(200).json(productWithTags);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
