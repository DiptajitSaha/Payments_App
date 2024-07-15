
const zod = require('zod');

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6).max(20)
});

const signinAuthenticator = (req, res, next) => {
    const { username, password } = req.body;
    const { error } = signinSchema.safeParse({ username, password });

    if(error){
        return res.status(411).json({
            error
        });
    }
    next();
}

module.exports = {
    signinAuthenticator
}