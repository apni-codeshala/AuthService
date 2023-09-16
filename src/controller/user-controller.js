const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: user,
            success: true,
            message: "User created successfully",
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong inside controller layer");
        return res.status(400).json({
            data: {},
            success: false,
            message: "Not able to create user",
            err: error
        })
    }
}

module.exports = {
    create
}