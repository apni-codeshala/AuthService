const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig')
const UserRepository = require('../repository/user-repository');
const { use } = require('../routes');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong inside service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);       
        } catch (error) {
            console.log("Something went wrong inside password comparison");
            throw error;
        }
    }

    async signIn(data) {
        try {
            // Step 1: Fetch the user using the email
            const user = await this.userRepository.getByEmail(data.email);

            //Step 2: Compare incoming plain password with plain encrypted password
            const passwordMatch = this.checkPassword(data.password, user.password);
            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw {error: "Incorrect password"};
            }

            //Step 3: If password match than create a token and sent it to the user
            const newJwt = this.createToken({
                email: user.email,
                id: user.id
            });
            return newJwt;

        } catch (error) {
            console.log("Something went wrong inside sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: "Invalid token"};
            }

            const user = await this.userRepository.getById(response.id);
            console.log(user);
            if(!user) {
                throw {error: "No user with corresponding token exist"};
            }

            return user.id;
        } catch (error) {
            console.log("Something went wring in auth process");
            throw error;
        }
    }

}

module.exports = UserService;