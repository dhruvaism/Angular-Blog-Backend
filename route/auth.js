const { createUser,login } = require('../controller/auth');
const { hasRegistrationField, checkUser,hasLoginField,isPasswordAndUserMatch} = require('../config/helper');
const router = require('express').Router();

router.post("/register",[hasRegistrationField,checkUser],createUser);
router.post("/login",[hasLoginField,isPasswordAndUserMatch],login);


module.exports = router;