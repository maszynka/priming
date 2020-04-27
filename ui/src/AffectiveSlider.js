import './AffectiveSlider.css';
import debounce from 'lodash.debounce';
import useDebounce from './helpers/useDebounce';

import React, {useEffect, useState} from 'react';

const AffectiveSlider = ({passAnswer}) => {
    const [answer, setAnswer] = useState({
        pleasure: null,
        arousal: null
    });

    const debouncedSearchTerm = useDebounce(answer, 500);

    // const [arousal, setArousal] = useState(.5);

    const setAnswerProxy = (type) => {
        console.log(type);
        return (value) => {
            console.log({
                ...answer,
                [type]: value
            });
            setAnswer({
                ...answer,
                [type]: value
        })
        };
    };

    const Arousal = ({setAnswer}) => {
        const [arousal, setArousal] = useState(.5);

        useEffect(()=> {
            console.log(arousal);
            debounce(() => {
                console.log(arousal);
                setAnswer(arousal);
            }, 150);
        }, [arousal]);

        return (
            <div>
                <span>Stopień pobudzenia</span>
                <div className="arousal">
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_sleepy.svg"></object>
                    <input type="range" name="AS-arousal" id="AS-arousal" value={arousal} min="0" max="1" step=".01"
                        onChange={(event) => setArousal(event.target.value)}
                    />
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_wideawake.svg"></object>
                    <object className="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object>
                </div>
            </div>
    )};

    const Pleasure = ({setAnswer}) => {
        const [pleasure, setPleasure] = useState(.5);

        useEffect(()=> {
            debounce(()=> {
                console.log(pleasure);
                setAnswer(pleasure)
            }, 150);
        }, [pleasure]);

        return (
            <div>
                <span>Stopień przyjemności</span>
                <div className="pleasure">
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_unhappy.svg"></object>
                    <input type="range" name="AS-pleasure" id="AS-pleasure" value={pleasure} min="0" max="1" step=".01"
                           onChange={({target: {value}}) =>setPleasure(value)}/>
                    <object className="arousal_svg" type="image/svg+xml" data="images/AS_happy.svg"></object>
                    <object className="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object>
                </div>
            </div>
    )};

    return (
        <>
            <div id='AffectiveSlider'>
                <div>
                    <Arousal
                        setAnswer={setAnswerProxy('arousal')}
                    />
                    <Pleasure
                        setAnswer={setAnswerProxy('pleasure')}
                    />
                    {/*{window.primed ?
                        <>
                            <Arousal
                                arousal={arousal}
                                setArousal={setArousal}
                            />
                            <Pleasure
                                pleasure={pleasure}
                                setPleasure={setPleasure}
                            />
                        </>
                        :
                        <>
                            <Pleasure
                                pleasure={pleasure}
                                setPleasure={setPleasure}
                            />
                            <Arousal
                                arousal={arousal}
                                setArousal={setArousal}
                            />
                        </>
                    }*/}
                </div>
            </div>
        </>
    );
};


export default AffectiveSlider;
