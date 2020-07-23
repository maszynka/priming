import flatten from 'flat';
import Papa from 'papaparse';
import readFiles from './readFiles';
import tryParseJSON from './tryParse';
import {writeJsonFile, writeCsvFile} from "./writeFiles";

const sampleData = [
    {
        "statSettings": {
            "startTimestamp": 1588804238554,
            "primed": true,
            "uiRandom": true,
            "group": "ANdRI",
            "endTimestamp": 1588804247800,
            "hasPreviouslyParticipated": "hasPreviouslyParticipated"
        },
        "systemStats": {
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15",
            "screenSizes": {
                "availHeight": 973,
                "availWidth": 1920,
                "devicePixelRatio": 1
            },
            "fps": {
                "min": 46.44,
                "max": 60.94,
                "averarge": 51.286,
                "measureingTime": 5000
            }
        },
        "gender": "Kobieta",
        "age": "50-60",
        "city": "między 100 a 250 tyś. mieszkańsów",
        "education": "Wyższe",
        "pleasure": "1",
        "arousal": "1"
    },
    {
        "gender": "Kobieta",
        "age": "18-29",
        "city": "powyżej 500 tyś. mieszkańsów",
        "education": "Wyższe",
        "arousal": "0.29",
        "pleasure": "0.64",
        "statSettings": {
            "startTimestamp": 1588835207169,
            "primed": false,
            "uiRandom": false,
            "group": "ANdRI",
            "endTimestamp": 1588835235667,
            "hasPreviouslyParticipated": "hasPreviouslyParticipated"
        },
        "systemStats": {
            "ua": "Mozilla/5.0 (Linux; Android 10; SM-G975F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/537.36 [FB_IAB/Orca-Android;FBAV/263.0.0.18.125;]",
            "screenSizes": {
                "availHeight": 869,
                "availWidth": 412,
                "devicePixelRatio": 3.5
            },
            "fps": {
                "min": 49.9,
                "max": 60.76,
                "averarge": 57.382000000000005,
                "measureingTime": 5000
            }
        }
    }
];

const flattenObjectsInArray = (data) => {
    if (Array.isArray(data)) {
        return data.map(entry => flatten(entry, {delimiter: '_'})).filter(entry => {
            return true;
        });
    }
};

const flattenJSON = (content) => {
    const json = tryParseJSON(content);
    return  flattenObjectsInArray(json);
};

let arr = []

readFiles( `${__dirname}/../../results/`)
    .then(files => {
        const jsonFiles = files.filter(file => file.filename.endsWith('.json'));

        arr = jsonFiles.map(
            file => flattenJSON(file.contents)
        ).flat();

        console.log(arr.length);

        writeJsonFile(arr, `${__dirname}/../results-merged/results-merged.json`);

        const csv = Papa.unparse(arr);

        writeCsvFile(arr, `${__dirname}/../results-merged/results-merged.csv`)


    })
    .catch( error => {
        console.log( error );
    });


const makeObjectFlat = (object) => {

}
