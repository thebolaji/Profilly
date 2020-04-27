var express = require('express');
var router = express.Router();
const go = require('../controller/control')


/* GET Register page. */
router.get('/register', go.RegPage);
/* GET Login Page. */
router.get('/login', go.LoginPage);




// -----------------------------------------
/* POST to Register page. */
router.post('/register', go.RegForm);


module.exports = router;