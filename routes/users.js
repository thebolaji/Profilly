var express = require('express');
var router = express.Router();
const go = require('../controller/control')
const verify = require('../login_auth/verify')
const loginAuth = require('../login_auth/loginAuth')

/* GET Register page. */
router.get('/register', loginAuth, go.RegPage);
/* GET Login Page. */
router.get('/login', loginAuth, go.LoginPage);
router.get('/create', go.CreatePage);


// -----------------------------------------
/* POST to Register page. */
router.post('/register', go.RegForm);
router.post('/login', go.LogForm);
router.post('/create', go.creatProf);


module.exports = router;