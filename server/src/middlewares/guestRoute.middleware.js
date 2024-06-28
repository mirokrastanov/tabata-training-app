const guestRoute = async (req, res, next) => {
    try {
        if (!req.user) return next();
        res.status(401).json({
            error: 'You are already logged in.',
            user: req.user,
            session: req.session,
            sessionID: req.sessionID
        });
    } catch (error) {
        console.log('Error in guestRoute middleware: ', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            msg: error.message,
            user: req.user,
            session: req.session,
            sessionID: req.sessionID
        });
    }
};

export default guestRoute;