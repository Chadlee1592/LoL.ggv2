// const router = require("express").Router();
// const lolsController = require("../../controllers/lolsController");

// router.route("/")
//     .get(lolsController.findAll)
//     .post(lolsController.create);

// router
//     .route("/:id")
//     .get(lolsController.findById)
//     .put(lolsController.update)
//     .delete(lolsController.remove);

// module.exports = router;

const router = require("express").Router();
const lolsController = require("../../controllers/lolsController");

router.route("/").get(lolsController.findAll);

router.route("/:id").get(lolsController.findAll);

module.exports = router;
