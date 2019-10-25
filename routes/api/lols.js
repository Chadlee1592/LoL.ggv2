const router = require('express').Router();
const lolsController = require('../../controllers/lolsController');

router.route('/').get(lolsController.findAll);

router.route('/:id').get(lolsController.findAll);

module.exports = router;
