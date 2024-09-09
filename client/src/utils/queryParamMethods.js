export function getQueryParams(location) {
    const queryParams = new URLSearchParams(location.search);

    const params = {};
    queryParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}

export function getWorkoutIdFromQuery(location) {
    const queryParams = getQueryParams(location);
    return queryParams.id;
}

