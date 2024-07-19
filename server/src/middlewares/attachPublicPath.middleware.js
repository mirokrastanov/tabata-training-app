export const attachPublicPath = (path) => {
    return (req, res, next) => {
        req.publicPath = path;

        next();
    }
};
