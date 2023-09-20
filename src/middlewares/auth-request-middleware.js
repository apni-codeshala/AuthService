const vlaidateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            succes: false,
            error: {},
            message: "Something went wrong",
            err: 'Email or password missing in signup/signin request'
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            succes: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        });
    }
    next();
}

const validateIsAirlineBussinessRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            succes: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        });
    }
    next();
}

module.exports = {
    vlaidateUserAuth,
    validateIsAdminRequest,
    validateIsAirlineBussinessRequest
}