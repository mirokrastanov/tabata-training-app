import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// TODO - update after implementing sessions and cookies fully
const userRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        // if (!token) {
        //     return res.status(401).json({ error: 'Unauthorized - No token provided' });
        // }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // if (!decoded) {
        //     return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        // }
        // const user = await User.findById(decoded.userId).select('-password');
        // if (!user) {
        //     return res.status(401).json({ error: 'User not found' });
        // }

        if (req.user) return next();
        res.status(401).json({ error: 'Unauthorized. You need to login.' });
    } catch (error) {
        console.log('Error in userRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default userRoute;