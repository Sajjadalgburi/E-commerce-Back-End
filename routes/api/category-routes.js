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

// GET method for a sepcific category id
router.get("/:id", async (req, res) => {
  try {
    // Fetch category by id along with its associated products
    const categoryData = await Category.findByPk(req.params.id, {
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

// POST method to post a specific category name which will be grabbed from the request body
router.post("/", async (req, res) => {
  try {
    // Attempt to create a new category using data from the request body
    const categoryData = await Category.create({
      category_name: req.body.category_name, // Extract category name from request body
    });

    // If category creation is successful, respond with status 200 and the created category data
    res.status(200).json(categoryData);
  } catch (err) {
    // If an error occurs during category creation or database operation
    console.error(err); // Log the error to the console for debugging purposes

    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

// PUT method to update a specific category id
router.put("/:id", async (req, res) => {
  try {
    // Find the category by id
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category with the provided data
    await category.update(req.body);

    // Fetch the updated category along with its associated products
    const updatedCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // Send the fetched category data as a JSON response with a 200 status code
    res.status(200).json(updatedCategory);
  } catch (err) {
    // Handle any errors that occur during the updating process
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
