const UserRepository = require('../repository/user-repository');

const userRepository = new UserRepository();

class UserService {

    async create(data) {
        try {
            const user = await userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong inside service layer");
            throw error;
        }
    }

}

module.exports = UserService;