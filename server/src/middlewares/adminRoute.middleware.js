const adminRoute = async (req, res, next) => {
    // Future admin passthrough logic 
    // next();

    // Placeholder logic for now...
    res.status(500).json({
        error: 'Internal Server Error',
        msg: 'Restricted route. Admin only. NYI.',
        user: req.user,
        session: req.session,
        sessionID: req.sessionID,
    });
};

export default adminRoute;