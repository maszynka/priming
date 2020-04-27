const startTimestamp = Date.now();
export let statSettings = {
    startTimestamp,
    primed: startTimestamp % 2 === 0,
    uiRandom: Math.random() >= 0.5
};

window.statSettings = statSettings;

export const generateStatSettings = () => {
    const startTimestamp = Date.now();
    statSettings = {
        startTimestamp,
        primed: startTimestamp % 2 === 0,
        uiRandom: Math.random() >= 0.5
    };
    return statSettings;
}

