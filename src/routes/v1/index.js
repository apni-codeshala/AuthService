const express = require('express');

const { vlaidateUserAuth } = require('../../middlewares/auth-request-middleware');
const UserController = require('../../controller/user-controller');

const router = express.Router();

router.post(
    '/signup',
    vlaidateUserAuth,
    UserController.signUp
);
router.get(
    '/signin',
    vlaidateUserAuth,
    UserController.signIn
);
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

module.exports = router;