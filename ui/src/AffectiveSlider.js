import './AffectiveSlider.css';

import React, {useEffect, useState} from 'react';

const AffectiveSlider = props => {
    const [arousal, setArousal] = useState(.5);
    const [pleasure, setPleasure] = useState(.5);


    const Arousal = (
    ) => (
        <>
            Stopień pobudzenia
            <div className="arousal">
                <object className="arousal_svg" type="image/svg+xml" data="images/AS_sleepy.svg"></object>
                <input type="range" name="AS-arousal" id="AS-arousal" value={arousal} min="0" max="1" step=".01"
                       onChange={setArousal}/>
                <object className="arousal_svg" type="image/svg+xml" data="images/AS_wideawake.svg"></object>
                <object className="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object>
            </div>
        </>
    );

    const Pleasure = () => (
        <>
            Stopień przyjemności
            <div className="pleasure">
                <object className="arousal_svg" type="image/svg+xml" data="images/AS_unhappy.svg"></object>
                <input type="range" name="AS-pleasure" id="AS-pleasure" value={pleasure} min="0" max="1" step=".01"
                       onChange={setPleasure}/>
                <object className="arousal_svg" type="image/svg+xml" data="images/AS_happy.svg"></object>
                <object className="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object>
            </div>
        </>
    );

    return (
        <>
            <div id='AffectiveSlider'>
                <div>
                    {Math.random() > 0.5 ?
                        <>
                            <Arousal/>
                            <Pleasure/>
                        </>
                        :
                        <>
                            <Pleasure/><Arousal/>
                        </>
                    }
                </div>
            </div>
        </>
    );
};


export default AffectiveSlider;
