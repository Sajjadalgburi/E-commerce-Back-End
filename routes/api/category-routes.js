const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET method to get everything from the category model
router.get("/", async (req, res) => {
  try {
    // Fetch all categories along with their associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }], // Include the Product model to fetch associated products
    });
    // Send the fetched category data as a JSON response with a 200 status code
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle any errors that occur during the fetching process
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
