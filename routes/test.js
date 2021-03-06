var express = require('express');
var router = express.Router();

var test_controller = require('../controllers/testController');

router.get('/', test_controller.index)
router.get('/broadcast', test_controller.broadcast)

router.ws('/', test_controller.message)

module.exports = router;