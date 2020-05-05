//https://stackoverflow.com/a/52727222/1867152
// Options
const outputEl         = document.getElementById('fps-output');
const decimalPlaces    = 2;
const updateEachSecond = 1;
const measureingTime = 5 * 1000;
const startedAt = performance.now();


function arrayMin(arr) {
    return arr.reduce(function (p, v) {
        return ( p < v ? p : v );
    });
}

function arrayMax(arr) {
    return arr.reduce(function (p, v) {
        return ( p > v ? p : v );
    });
}

const arrayAverage = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

let collectedFpsMeasures = [];

let stats = {
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
    average: null,
    measureingTime,
};
// Cache values
const decimalPlacesRatio = Math.pow(10, decimalPlaces);
let timeMeasurements     = [];

// Final output
let fps = 0;

const tick = function(resolve) {
    const highResTimeStamp = performance.now();
    timeMeasurements.push(highResTimeStamp);

    const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];

    if (msPassed >= updateEachSecond * 1000) {
        fps = Math.round(timeMeasurements.length / msPassed * 1000 * decimalPlacesRatio) / decimalPlacesRatio;
        collectedFpsMeasures.push(fps);

        timeMeasurements = [];
        if (highResTimeStamp - startedAt >= measureingTime)
        {
            stats = {
                min: Math.min(arrayMin(collectedFpsMeasures), stats.min),
                max: Math.max(arrayMax(collectedFpsMeasures), stats.max),
                averarge: arrayAverage(collectedFpsMeasures),
                measureingTime
            };
            resolve(stats);
            return;
        }
    }

    requestAnimationFrame(() => {
        tick(resolve);
    });
}


export const measureFps = new Promise((resolve, reject)=>{
   try {
       tick(resolve);
   } catch (e) {
       reject(e);
   }
});
