const e = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const signUp = async (req, res) => {
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

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            success: true,
            message: 'SignIn successfully',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log('Something went wrong in signIn');
        return res.status(400).json({
            data: {},
            message: 'Not able to signIn',
            successs: false,
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            message: "User is authenticated an token is valid",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            err: error,
            data: {},
            message: "Something went wrong in authentication"
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched wheather user is admin or not'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const isAirlineBussiness = async (req, res) => {
    try {
        const response = await userService.isAirlineBussiness(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched wheather user is airline bussiness or not'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = {
    signUp,
    signIn, 
    isAuthenticated,
    isAdmin,
    isAirlineBussiness
}