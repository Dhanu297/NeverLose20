const express = require("express");
const router = express.Router();

const requireFirebaseAuth = require("../middleware/firebaseAuth");
const itemsController = require("../controllers/itemsController");

// Create item
router.post("/", requireFirebaseAuth, itemsController.createItem);

// update item
router.put("/:itemId", requireFirebaseAuth, itemsController.updateItem);

// List items
router.get("/", requireFirebaseAuth, itemsController.listItems);

// Owner-only item fetch (must be BEFORE :itemId)
router.get("/owner/:itemId", requireFirebaseAuth, itemsController.getItemByIdForOwner);

// Public/owner fetch by ID
router.get("/:itemId", requireFirebaseAuth, itemsController.getItemById);

module.exports = router;