const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Define a route handler for GET requests to the root endpoint
router.get("/", async (req, res) => {
  try {
    // Attempt to retrieve all tag data from the database, including associated products
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    // If successful, send a 200 OK response with the tag data in JSON format
    res.status(200).json(tagData);
  } catch (err) {
    // If an error occurs during the database query, log the error to the console
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
