const { verifyJwt } = require("../utils/jwtAuth");
const zod = require('zod');

const passSchema = zod.string().refine((str) => {
    return str.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
})

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            status: 'missing header parameter',
        });
    }
    const token = authHeader.trim().split(" ")[1];
    const decoded = verifyJwt(token);

    if (decoded) {
        req.user = decoded.id
        next();
    }
    else {
        return res.status(411).json({
            status: 'invalid token',
        });
    }
}

const passwordCheck = (req, res, next) => {

    if (req.body.password) {
        const result = passSchema.safeParse(req.body.password);
        if (!result.success) {
            return res.status(411).json({
                message: "Error while updating information"
            });
        }
    }
    next();
}


module.exports = {
    authMiddleware,
    passwordCheck
};