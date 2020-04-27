var express = require('express');
var router = express.Router();
const go = require('../controller/control')


/* GET Register page. */
router.get('/register', go.RegPage);
/* GET Login Page. */
router.get('/login', go.LoginPage);

module.exports = router;