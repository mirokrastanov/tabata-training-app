// TODO - update after implementing sessions and cookies fully

const guestRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            return res.status(401).json({ error: 'You are already athenticated' });
        }
        next();
    } catch (error) {
        console.log('Error in guestRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default guestRoute;