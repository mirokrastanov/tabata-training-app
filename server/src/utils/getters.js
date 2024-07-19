import fs from 'fs';
import path from 'path';

export const getInternalFilePath = (publicPath, filePath) => {
    return path.join(publicPath, filePath);
};

export const getPublicRelativePath = (filePath) => {
    // D:\CODING\PROJECTS\tabata-training-app\server\public\test1\index.html
    let result = path.relative('public', filePath);
    result = result.replaceAll('\\', '/');
    return result;
}

export async function getPublicFiles(publicPath) {
    let finalArr = [];
    await getFilesFromDir(publicPath, finalArr);
    return finalArr;
}

async function getFilesFromDir(publicPath, finalArr) {
    try {
        const files = await fs.promises.readdir(publicPath);

        for (const file of files) {
            const filePath = path.join(publicPath, file);
            const stats = await fs.promises.stat(filePath);

            if (stats.isDirectory()) {
                // invoked recursively to explore ALL sub-directories
                await getFilesFromDir(filePath, finalArr);
            } else {
                finalArr.push(getPublicRelativePath(filePath));
            }
        }
    } catch (err) {
        console.error('Error reading public directory:', err);
    }
}