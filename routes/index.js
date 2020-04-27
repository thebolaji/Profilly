var express = require('express');
var router = express.Router();
const go = require('../controller/control')


/* GET Homepage page. */
router.get('/', go.HomePage);

module.exports = router;