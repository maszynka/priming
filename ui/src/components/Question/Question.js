import React, {useState} from "react";
import AffectiveSlider from "./AffectiveSlider";

const prieMs = 50;

export const Question = ({question, type, answers, p, handleChange, visible})=> {
    const [usedQuestion, setUsedQuestion] = useState(question);
    const [error, setError] = useState(null);
    const letsPrime = () => {
        setUsedQuestion(p);
        setTimeout(() => {
            setUsedQuestion(question);
        }, prieMs);
    };

    const [primed, setPrimed] = useState(false);

    const handleClick = ()=> {
        if (primed || !window.statSettings.primed) return;

        letsPrime();
        setPrimed(true);
    };

    // const isValid = (type, newValue) => {
    //     return {
    //         select: () => questions.indexOf(decodeURI(newValue)) > 0,
    //         input: () => newValue.length > 0,
    //         affectiveSlider: () => true
    //     }[type]()
    // };

    const AnswerInput = ({className, type, answers, p, nameProp, handleChange, handleClick})=> {
        const inputType = {
            select: () => {
                const answersWithDefault = type === 'select' ? ['wybierz opcje...', ...answers] : answers;

                return(
                    <select className={className} onChange={handleChange} name={nameProp} onClick={handleClick}>
                        {answersWithDefault.map(
                            (answer, i) => {
                                console.log(answer);
                                const optionValue = encodeURI(answer);
                                return <option key={optionValue} value={optionValue} hidden={i === 0}>{answer}</option>
                            }
                        )}
                    </select>
                )
            },
            affectiveSlider: ()=> <AffectiveSlider handleChange={handleChange} />,
        };

        return inputType[type]();
    };

    return (
        <div className={`question-wrap question-wrap-${type} ${visible}`}>
            <span class="error-wrap" hidden={!error}>{error}</span>
            <span className="question-label">{usedQuestion}</span>
            <AnswerInput className="question-answer" type={type} answers={answers} p={p} handleChange={handleChange} handleClick={handleClick}/>
            {/*<input value={value} setValue={setValue}/>*/}
        </div>

    )
}
