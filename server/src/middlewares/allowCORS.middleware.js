const headersToSet = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Requested-With',
};

export const allowCORS = (req, res, next) => {
    Object.entries(headersToSet).forEach(([k, v]) => {
        res.header(k, v);
    });

    next();
};

