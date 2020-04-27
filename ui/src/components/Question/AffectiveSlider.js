import './AffectiveSlider.css';

import React, { memo } from 'react';

const AffectiveSlider = memo(({handleChange}) => {

    const Arousal = memo(({handleChange}) => {
        return (
            <div>
                <span>Stopień pobudzenia</span>
                <div className="arousal" >
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_sleepy.svg"></object>
                    <input type="range" name="arousal" id="AS-arousal" defaultValue="0.5" min="0" max="1" step=".01"
                        onChange={handleChange}
                    />
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_wideawake.svg"></object>
                    <object className="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object>
                </div>
            </div>
    )});

    const Pleasure = memo(({handleChange}) => {

        return (
            <div>
                <span>Stopień przyjemności</span>
                <div className="pleasure">
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_unhappy.svg"></object>
                    <input type="range" name="pleasure" defaultValue="0.5" id="AS-pleasure" min="0" max="1" step=".01"
                           onChange={handleChange}/>
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_happy.svg"></object>
                    <object className="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object>
                </div>
            </div>
    )});

    return (
        <>
            <div id='AffectiveSlider'>
                <div>

                    {window.statSettings.uiRandom ? (
                        <>
                            <Arousal
                                handleChange={handleChange}
                            />
                            <Pleasure
                                handleChange={handleChange}
                            />
                        </>
                    ) : (
                        <>
                            <Arousal
                                handleChange={handleChange}
                            />
                            <Pleasure
                                handleChange={handleChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
});


export default AffectiveSlider;
