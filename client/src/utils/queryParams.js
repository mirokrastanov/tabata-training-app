export function getQueryParams(location) {
    const queryParams = new URLSearchParams(location.search);

    const params = {};
    queryParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}