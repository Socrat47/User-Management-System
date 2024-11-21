import jwt from 'jsonwebtoken';

export const authJwt = (req, res, next) => {
    console.log(req.body)
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "Token Geçersiz"
                });
            }
            req.user = user;
            next();
        })
    }
    else {
        res.status(401).json({
            message: "Token Gerekli!"
        });
    };
};