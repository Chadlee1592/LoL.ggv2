const router = require('express').Router();
const lolsController = require('../../controllers/lolsController');

router.route('/').get(lolsController.findAll);

router.route('/:id').get(lolsController.findAll);

router.route('/champion/:champion').get(lolsController.findChampion);

module.exports = router;
