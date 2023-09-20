const { StatusCodes } = require('http-status-codes');

const { User, Role } = require('../models/index');
const { AppError } = require('../utils/errors/index')

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot create user',
                'There was some issue in creating user',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot get user by email',
                'There was some issue in getting the user by email',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getById(id) {
        try {
            const user = await User.findByPk(id)
            return user;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot get user by id',
                'There was some issue in gettting the user by id',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot get the role of the user is admin or not',
                'There was some issue in getting the role',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async isAirlineBussiness(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'AIRLINE_BUSSINESS'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot get the role of the user is airline bussiness or not',
                'There was some issue in getting the role',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    
}

module.exports = UserRepository;