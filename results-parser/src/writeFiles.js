import fs from 'fs';
import path from 'path';

export function writeJsonFile (data, pathToFile) {
    fs.writeFile(pathToFile, JSON.stringify(data), (err, result) => {
        if (err) {
            console.error({err, result})
        }

    })
}


export function writeCsvFile (data, pathToFile) {
    fs.writeFile(pathToFile, data, (err, result) => {
        if (err) {
            console.error({err, result})
        }

    })
}
