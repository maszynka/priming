if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;
}

var framess = [];
window.framess = framess;

var t = [];
function animate(now) {
    
    t.unshift(now);
    if (t.length > 10) {
        var t0 = t.pop();
        var fps = Math.floor(1000 * 10 / (now - t0));
        $('#fps').text(fps + ' fps');
        framess.push(fps);
    }

    window.requestAnimationFrame(animate);
};

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

const arraySum = arr => arr.reduce( ( p, c ) => p + c, 0 );


const stats = {
  min: Number.POSITIVE_INFINITY,
  max: Number.NEGATIVE_INFINITY,
  average: null,
  sum: 0,
  collectedLength: 0,
};

const countMinMaxAndAverage = (frames) => {
  const len = frames.length;
  const average = arrayAverage(frames.average);
  const sum = arraySum(frames);
  
  return {
  	min: Math.min(arrayMin(frames), stats.min),
    max: Math.max(arrayMax(frames), stats.max),
    sum: arraySum(frames),
    averarge: stats.sum + sum
    collectedLength: stats.length + len,
  }
}

/* setInterval(()=>{
  console.log(framess)
}, 10000) */

window.requestAnimationFrame(animate);