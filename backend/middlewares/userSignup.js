const zod = require('zod');

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(3).max(30).refine((str) => {
        return str.match(/^[a-zA-Z0-9]+$/);
    }, {
        message: 'First name must contain only letters'
    }),
    lastName: zod.string().min(3).max(30).refine((str) => {
        return str.match(/^[a-zA-Z0-9]+$/);
    },{
        message: 'Last name must contain only letters'
    }),
    password: zod.string().min(6).refine((value) => {
    return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@*$%&?])[a-zA-Z0-9!@*$%&?]{6,}$/);
    })
});

const signupAuthenticator = (req, res, next) => {
    const { username, firstName, lastName, password } = req.body;
    const { error } = signupSchema.safeParse({ username, firstName, lastName, password });
    if(error){
        console.log(error);
        res.status(411).json({
            error: 'invalid credentials!'
        });
        return;
    }
    
    next();
}

module.exports = { signupAuthenticator };