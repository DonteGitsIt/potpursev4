const router = require("express").Router();
const strainsController = require("../../controllers/strainsController");

// Matches with "/api/strains"
router.route("/")
  .get(strainsController.findAll)
  .post(strainsController.create);

// Matches with "/api/strains/:id"
router
  .route("/:id")
  .delete(strainsController.remove);

module.exports = router;