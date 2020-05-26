var express = require("express");
var router = express.Router();
const go = require("../controller/control");
const verify = require("../login_auth/verify");
const loginAuth = require("../login_auth/loginAuth");

/* GET Register page. */
router.get("/register", loginAuth, go.RegPage);
/* GET Login Page. */
router.get("/login", loginAuth, go.LoginPage);
router.get("/create", verify, go.CreatePage);
router.get("/edit", verify, go.editPage);
router.get("/:slug", verify, go.Preview);
router.delete("/:id", verify, go.deletePage);
router.get("/edit/:id", verify, go.editPage);

// router.get("/edit-profile", verify, go.editProfile);

// -----------------------------------------
/* POST to Register page. */
router.post("/register", go.RegForm);
router.post("/login", go.LogForm);
router.post("/create", go.creatProf);
router.put("/edit/:id", go.updatePage);

module.exports = router;
