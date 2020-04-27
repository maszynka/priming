import React, {useEffect, useState, useRef } from 'react';
// import { Input } from 'antd';

import logo from './logo.svg';
import './App.css';
import AffectiveSlider from "./AffectiveSlider";

const prieMs = 50;

const initialFormData = {
    gender: null,
    age: null,
    city: null,
    education: null,
    arousal: null,
    pleasure: null,
}

const questions = [
    {
        answers: ['Mężczyzna', 'Kobieta', 'Wolę nie mówić', 'Inna'],
        nameProp: 'gender',
        p: 'Uśmiech',
        question: 'Płeć',
        type: 'select',
    },
    {
        answers: ['poniżej 18', '18-29', '30-39', '40-49', '50-60' , 'powyżej 60 roku'],
        nameProp: 'age',
        p: 'Dobro',
        question: 'Wiek',
        type: 'select',
    },
    {
        question: 'Miasto',
        nameProp: 'city',
        type: 'select',
        answers: ['do 50 tyś. mieszkańsów', 'między 50 a 100 tyś. mieszkańsów', 'między 100 a 250 tyś. mieszkańsów', 'powyżej 500 tyś. mieszkańsów'],
        p: 'Dobro'
    },
    {
        question: 'Wykształcenie',
        nameProp: 'education',
        type: 'select',
        answers: ['Podstawowe', 'Średnie', 'Wyższe'],
        p: 'Spełnienie'
    },
    {
        type: 'affectiveSlider'
    }
];

const SplashScreen = ()=> {
    return <div className="splashScreen">
        <h1>Badanie aktualnego nastroju uzytkownikow</h1>
        <p>
            Prezentowana ankieta bada nastroj uzytkownikow
        </p>
        <p>
            Wyniki analizowane będą zbiorczo oraz udostępnione za darmo dla wszystkich zainteresowanych.
            Biorąc udział w ankiecie wyrażasz zgodę na przetwarzanie zebranych danych w celu ich analizy.
        </p>

    </div>
}

const Question = ({question, type, answers, p, handleChange})=> {
    //const [placeholder, setPlaceholder] = useState(question);
    const [usedQuestion, setUsedQuestion] = useState(question);
    const [error, setError] = useState(null);
    const letsPrime = ()=> {
        setUsedQuestion(p);
        setTimeout(()=>{
            setUsedQuestion(question);
        }, prieMs)
    };

    const [primed, setPrimed] = useState(false);

    const onClick = ()=> {
        if (primed) return;

        letsPrime();
        setPrimed(true);
    };

    const [value, setValue] = useState('');
    const isValid = (type, newValue) => {
        return {
            select: () => questions.indexOf(decodeURI(newValue)) > 0,
            input: () => newValue.length > 0,
            affectiveSlider: () => true
        }[type]()
    };

    // const onChange = ({target: value})=> {
    //     setValue(value);
    //     proxySetAnswer({type, value})
    // };

    // const proxySetAnswer = ({type, value}) => {
    //     console.log({type, value})
    //     if (isValid(type, value)) {
    //         if (error) setError(null);
    //         setAnswer()
    //     } else {
    //         if (type === 'select'){
    //             setError('Brakujące pole')
    //         }
    //     }
    // }



    const AnswerInput = ({className, type, answers, p, onClick, nameProp, handleChange})=> {
        const inputType = {
            select: () => {
                const answersWithDefault = type === 'select' ? ['wybierz opcje...', ...answers] : answers;

                return(
                    <select className={className} onChange={handleChange} name={nameProp}>
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
            input: () => <input className={className} onChange={handleChange} name={nameProp}/>,
            affectiveSlider: ()=> <AffectiveSlider handleChange={handleChange} />,
        };

        return inputType[type]();
    };

    return (
            <div className={`question-wrap question-wrap-${type}`}>
                <span class="error-wrap" hidden={!error}>{error}</span>
                <span className="question-label">{usedQuestion}</span>
                <AnswerInput className="question-answer" type={type} answers={answers} p={p} handleChange={handleChange}/>
                {/*<input value={value} setValue={setValue}/>*/}
            </div>

    )
}

function App() {
    useEffect(()=> {
        let {startTimestamp} = window;
        startTimestamp = startTimestamp || Date.now();
        window.startTimestamp = startTimestamp;
        window.primed = startTimestamp % 2 === 0;
    }, []);

    const formDataRef = useRef(initialFormData);

    const handleChange = (e) => {
        if (!e || !e.target) return;
        const {target: {value, name}} = e;
        console.log(value);
        formDataRef.current = {
            ...formDataRef.current,
            [name]: value.trim()
        };
    };

    const handleSubmit = (e) => {

        console.log(formDataRef.current);
        // ... submit to API or something
    };

    const [currentlyVisibleQuestion, setCurrentlyVisibleQustion] = useState(0);
    const prevQuestion = ()=>{ setCurrentlyVisibleQustion(currentlyVisibleQuestion - 1) };
    const nextQuestion = ()=>{ setCurrentlyVisibleQustion(currentlyVisibleQuestion + 1) };

  return (
    <div className="App">
      <form>
        <div className="question-screen">
            {
                questions.map((questionData, i) =>
                    <Question {...questionData} key={questionData.question} handleChange={handleChange}/>
                )
            }
            <AffectiveSlider handleChange={handleChange}/>
            <button disabled={currentlyVisibleQuestion <= 0} className="prev-question" onClick={prevQuestion}>poprzednie</button>
            <button disabled={currentlyVisibleQuestion >= questions.length} className="next-question" onClick={nextQuestion}>kolejne</button>
            <button type="submit" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  );
}

export default App;
