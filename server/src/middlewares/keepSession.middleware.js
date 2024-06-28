const keepSession = async (req, res, next) => {
    try {
        if (req.user) return next(); // session object has already been modified by passport.js
        req.session.visited = true; // modifying the session object to ensure session is persisted even 
        // if the user has not logged in or for unanticipared scenarios where passport.js hasn't had 
        // the chance to modify it
        next();
    } catch (error) {
        console.log('Error in keepSession middleware: ', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            msg: error.message,
            user: req.user,
            session: req.session,
            sessionID: req.sessionID
        });
    }
};

export default keepSession;