export const generateStatSettings = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const group = urlParams.get('g');

    const startTimestamp = Date.now();
    const statSettings = {
        startTimestamp,
        primed: startTimestamp % 2 === 0,
        uiRandom: Math.random() >= 0.5,
        group
    };
    return statSettings;
}

