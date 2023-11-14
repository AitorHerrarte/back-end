const jwt = require("jsonwebtoken");
const mySecret = process.env.MYSECRET;

const auth = {
    checkIfAuth: async (req, res, next) => {

        if (!req.headers.authorization){
            return res.status(401).send("token inválido5");
            
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.json({
                message: "No tienes autorización",
                success: false
            })
            return
        }
        try {
            
            const decodedToken = await jwt.verify(token, mySecret);
            req.userInfo = decodedToken
            console.log('en el middleware', req.userInfo)
            next()
        } catch {
            res.status(401).send("token inválido2");

        }
    },
    
    publicMethod: async (req, res) => {
        next();
    }

}

module.exports = auth;