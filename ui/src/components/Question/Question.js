import React, {useState} from "react";
import AffectiveSlider from "./AffectiveSlider";
import './Question.css';

const prieMs = 30;

const AnswerInput = ({className, type, answers: answersProps, nameProp, handleChange, handleClick, statSettings})=> {
    const answers = answersProps ? answersProps.map(answer => ({
        value: answer,
        text: answer
    })) : [];
    const inputType = {
        select: () => {
            const answersWithDefault = [{
                text: 'wybierz opcje...',
                value: '',
            }, ...answers];

            return(
                <select required className={className} onChange={handleChange} name={nameProp} onClick={handleClick}>
                    {answersWithDefault.map(
                        ({value, text}, i) => (
                            <option key={value} value={value} hidden={i === 0}>{text}</option>
                        )
                    )}
                </select>
            )
        },
        affectiveSlider: ()=> <AffectiveSlider handleChange={handleChange} statSettings={statSettings}/>,
    };

    return inputType[type]();
};

export const Question = ({
 question,
 type,
 answers,
 p,
 handleChange,
 handleSubmit,
 visible,
 nameProp,
 nextQuestion,
 nextQuestionHidden,
 statSettings
})=> {
    const [usedQuestion, setUsedQuestion] = useState(question);
    const letsPrime = () => {
        setUsedQuestion(p);
        setTimeout(() => {
            setUsedQuestion(question);
        }, prieMs);
    };

    const [primed, setPrimed] = useState(false);

    const handleClick = ()=> {
        if (primed || !statSettings.primed) return;

        letsPrime();

        setPrimed(true);
    };

    const onClick = (e) => {
        e.preventDefault();
        nextQuestion();
    }


    return (
        <div className={`question-outer-wrap ${visible ? 'visible' : ''}`}>
            <div className={`question-wrap question-wrap-${type} ${visible ? 'visible' : ''}`}>

                <span className="question-label">{usedQuestion}</span>
                <AnswerInput className="question-answer" type={type} answers={answers} handleChange={handleChange} nameProp={nameProp} handleClick={handleClick} statSettings={statSettings}/>
                {/*<input value={value} setValue={setValue}/>*/}
                {!nextQuestionHidden ?
                    <button
                        className="next-question"
                        onClick={onClick}
                    >
                        kolejne pytanie
                    </button> :
                    <button type="submit" onClick={handleSubmit} className="submit-button">Wyślij odpowiedzi</button>
                }

            </div>
        </div>
    )
}
