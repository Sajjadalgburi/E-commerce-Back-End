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

// Define a route handler for GET request to find tag by its primary key
router.get("/:id", async (req, res) => {
  try {
    // Retrieve tag data by its primary key, including associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // Send a 200 OK response along with the retrieved tag data
    res.status(200).json(tagData);
  } catch (err) {
    // If an error occurs during the database query, log the error to the console
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
  // This route handler finds a single tag by its `id` including associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    // If an error occurs during the database query, log the error to the console
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message
    res.status(500).send(err);
  }
});

// Define a POST route for handling incoming requests to create a new tag
router.post("/", async (req, res) => {
  try {
    // Attempt to create a new tag using the provided tag_name from the request body
    const tagData = await Tag.create({
      where: { tag_name: req.body.tag_name }, // Define the tag_name based on the request body
    });

    // If successful, send a 200 OK response with the created tag data in JSON format
    res.status(200).json({ message: "Tag created successfully", tagData });
  } catch (err) {
    // If an error occurs during the database query, log the error to the console for debugging purposes
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message to indicate server-side issue
    res.status(500).send(err);
  }
});

// Handle PUT request to update a tag by ID
router.put("/:id", async (req, res) => {
  try {
    // Attempt to update the tag using the provided data from the request body
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id }, // Filter tags by ID
    });

    // If successful, send a 200 OK response with the updated tag data in JSON format
    res.status(200).json({
      message: `Tag updated successfully where tag ID is ${req.params.id}`,
    });
  } catch (err) {
    // If an error occurs during the database query, log the error to the console for debugging
    console.error(err);
    // Send a 500 Internal Server Error response along with the error message to indicate a server-side issue
    res.status(500).send(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
