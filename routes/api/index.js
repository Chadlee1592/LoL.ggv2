const router = require("express").Router();
const lolRoutes = require("./lols");

router.use("/lols", lolRoutes);

module.exports = router;