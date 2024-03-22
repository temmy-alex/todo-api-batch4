const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class UserController {
    static login(req, res, next){
        const { email, password } = req.body;

        if (!email) {
            res.status(400).json({status: 400, message: 'Email required!'})
        }

        if (!password) {
            res.status(400).json({status: 400, message: 'Password required!'})
         }

        // if (!email || !password) {
        //    res.status(400).json({status: 400, message: 'Email and password required!'})
        // } else {
            // SELECT * FROM Users WHERE email = email
            User.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if (!user) {
                    res.status(400).json({status: 400, message: 'Email or password is invalid!'})
                }

                let result = comparePassword(password, user.password)
                if (result) {
                    let access_token = createToken({id: user.id, email: user.email})
                    res.status(200).json({data: {access_token, id: user.id, name: user.name, message: 'Successfully logged in!'}})
                } else {
                    res.status(400).json({status: 400, message: 'Email or password is invalid!'})
                }
            })
            .catch(err => {
                next(err)
            })
        // }
    }

    static register(req, res, next) {
        const { name, email, password, confirmPassword } = req.body;

        // if (!name) {
        //     res.status(400).json({status: 400, message: 'Name required!'})
        // }

        // if (!email) {
        //     res.status(400).json({status: 400, message: 'Email required!'})
        // }

        // if (!password) {
        //     res.status(400).json({status: 400, message: 'Password required!'})
        // }

        // if (!confirmPassword) {
        //     res.status(400).json({status: 400, message: 'Confirm Password required!'})
        // }

        if (password != confirmPassword) {
            res.status(400).json({status: 400, message: 'Password and passwod confirmation not match!'})
        }

        const newUser = {
            name: name,
            email: email,
            password: password
        }

        // INSERT INTO Users (name, email, password) VALUES (?,?,?)
        User.create(newUser)
            .then(data => {
                res.status(201).json({message: 'Successfully registered!'})
            })
            .catch(err => {
                res.send(err)
                // next(err)
            })
    }

    static async userDetail(req, res, next) {
        const { email } = req.userData;

        try {
            const user = await User.findOne({where: {email}});

            res.status(200).json({
                message: 'Success fetch data user',
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = UserController;