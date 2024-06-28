const preRoutesErrorHandler = (err, req, res, next) => {
    if (err) {
        console.log(err);
        console.log({ msg: err.message, ...err });
        if (err?.source == 'deserializeUser') {
            req.session.passport = undefined;
            req.user = null;
        }
        // return res.status(500).json({ error: 'Internal Server Error', msg: err.message, ...err });
    }
    next();
};



export {
    preRoutesErrorHandler,

}
