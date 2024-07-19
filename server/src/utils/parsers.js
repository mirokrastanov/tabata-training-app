// const allFiles = await getPublicFiles(req.publicPath);
// const result = {};
// allFiles.forEach((f, i) => result[i] = `/assets/${f}`);
// res.status(200).json(result);

export const parseFiles = (result) => {
    const obj = {};
    Object.values(result).forEach(value => {
        let split = value.split('/');
        split.shift();
        createProperty(split, obj);
    });
    return obj;
}

function createProperty(split, obj) {
    let currentLevel = obj;
    for (const el of split) {
        if (el.includes('.')) {
            if (!currentLevel.files) {
                currentLevel.files = [];
            }
            currentLevel.files.push({ [el]: '/' + split.join('/') });
            return;
        }
        if (!currentLevel[el]) {
            currentLevel[el] = { files: [] };
        }
        currentLevel = currentLevel[el];
    }
}
