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
