const express = require('express');

const { 
    vlaidateUserAuth,
    validateIsAdminRequest,
    validateIsAirlineBussinessRequest
} = require('../../middlewares/auth-request-middleware');

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
);

router.get(
    '/isAdmin',
    validateIsAdminRequest,
    UserController.isAdmin
);

router.get(
    '/isAirlineBussiness',
    validateIsAirlineBussinessRequest,
    UserController.isAirlineBussiness
);

module.exports = router;