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

module.exports = {
    vlaidateUserAuth
}