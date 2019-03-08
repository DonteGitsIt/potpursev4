const router = require("express").Router();
const strainRoutes = require("./strains");

// Book routes
router.use("/strains", strainRoutes);

module.exports = router;