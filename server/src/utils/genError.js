const genError = (msg, properties = { source: '' }) => {
    const error = new Error(msg);
    error.propertyList = Object.keys(properties).join(', ');
    Object.entries(properties).forEach(property => {
        error[property[0]] = property[1];
    });
    return error;
};

export default genError;