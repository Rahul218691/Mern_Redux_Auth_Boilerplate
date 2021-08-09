const router = require('express').Router();
const {createUser,logUser,logout,generateAccessToken} = require('../controllers/auth');
const {userSigninValidator,userSignupValidator} = require('../../utils/validators/auth');
const {runValidation} = require('../../utils/validators');


router.post('/register',userSignupValidator,runValidation,createUser);
router.post('/login',userSigninValidator,runValidation,logUser);
router.post('/logout',logout);
router.post('/refresh_token',generateAccessToken);

module.exports = router;