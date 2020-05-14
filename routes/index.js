var express = require('express');
var router = express.Router();
const go = require('../controller/control')
    // const auth = require('../login_auth/auth')

/* GET Homepage page. */
router.get('/', go.HomePage);
router.get('/logout', go.logout);




module.exports = router;