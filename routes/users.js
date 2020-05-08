var express = require('express');
var router = express.Router();
const go = require('../controller/control')
const auth = require('../login_auth/auth')



/* GET Register page. */
router.get('/register', go.RegPage);
/* GET Login Page. */
router.get('/login', go.LoginPage);
router.get('/create', auth.checkToken, go.CreatePage);


// -----------------------------------------
/* POST to Register page. */
router.post('/register', go.RegForm);
router.post('/login', go.LogForm);


module.exports = router;