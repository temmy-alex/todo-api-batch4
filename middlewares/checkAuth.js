const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function checkAuth(req, res, next) {
    const { access_token } = req.headers

    try {
        const decoded = verifyToken(access_token)
        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if (!user) {
            res.status(404).json({status: 404, message: 'User not found!'})
        } else {
            req.userData = decoded;
            console.log(req.userData);
            next()
        }
    } catch (err) {
        res.status(401).json({status: 401, message: 'Token not provided!'})
    }
}

module.exports = checkAuth;