const discordRedirect = (req, res, next) => {
    req.authMethod = 'discord';
    next();
};

export default discordRedirect;