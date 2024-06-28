const clearAllCookies = (req, res, next) => {
    Object.keys(req.cookies).forEach(cookie => {
        res.clearCookie(cookie);
    });
    next();
};

export default clearAllCookies;