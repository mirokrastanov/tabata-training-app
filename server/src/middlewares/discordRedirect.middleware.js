const discordRedirect = (req, res, next) => {

    if (!req.query.code) {
        const queryParams = req.query;
        console.log("Discord authorization denied! \n", queryParams);

        req.authMethod = undefined;
        req.user = null;

        return res.status(401).json({
            msg: "Discord authorization denied!",
            user: null,
            errors: { ...queryParams },
        });
    }

    req.authMethod = 'discord';
    next();
};

export default discordRedirect;

`
If Authorization is denied:

http://localhost:8000/api/auth/discord/redirect?error=access_denied&error_description=The+resource+owner+or+authorization+server+denied+the+request

`
