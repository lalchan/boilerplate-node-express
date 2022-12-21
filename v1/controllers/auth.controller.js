import User from "../../models/user.model";
import JWT from "jsonwebtoken";

export async function LogIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email }).select('+hashedPassword +salt +expireAt',
        )
        if (!user.authenticate(password)) {
            throw new Error('Email or password is incorrect');
        }
        const token = JWT.sign(user.getUserData(), process.env.JWTKEY, { expiresIn: '10m' })
        res.respond({
            token
        })
    } catch (err) {
        res.failCase(err.message, 500);
    }
}