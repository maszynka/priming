import React, {useEffect, useState } from 'react';
// import { Input } from 'antd';

import logo from './logo.svg';
import './App.css';
import AffectiveSlider from "./AffectiveSlider";

const prieMs = 50;

const questions = [
    {
        question: 'Płeć',
        type: 'select',
        answers: ['Mężczyzna', 'Kobieta', 'Wolę nie mówić', 'Inna'],
        p: 'Uśmiech',
    },
    {
        question: 'Wiek',
        type: 'select',
        answers: ['poniżej 18', '18-29', '30-39', '40-49', '50-60' , 'powyżej 60 roku'],
        p: 'Dobro'
    },
    {
        question: 'Miasto',
        type: 'select',
        answers: ['do 50 tyś. mieszkańsów', 'między 50 a 100 tyś. mieszkańsów', 'między 100 a 250 tyś. mieszkańsów', 'powyżej 500 tyś. mieszkańsów'],
        p: 'Dobro'
    },
    {
        question: 'Wykształcenie',
        type: 'select',
        answers: ['Podstawowe', 'Średnie', 'Wyższe'],
        p: 'Spełnienie'
    },
    {
        type: 'affectiveSlider'
    }
];

const Question = ({question, type, answers, p, setAnswer})=> {
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

    const onChange = ({target: value})=> {
        setValue(value);
        proxySetAnswer({type, value})
    };

    const proxySetAnswer = ({type, value}) => {
        console.log({type, value})
        if (isValid(type, value)) {
            if (error) setError(null);
            setAnswer()
        } else {
            if (type === 'select'){
                setError('Brakujące pole')
            }
        }
    }

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

    const AnswerInput = ({className, type, answers, p, onClick})=> {
        const inputType = {
            select: () => {
                const answersWithDefault = type === 'select' ? ['wybierz opcje...', ...answers] : answers;

                return(
                    <select className={className} value={value} onChange={setValue} >
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
            input: () => <input className={className} value={value} onChange={setValue}/>,
            affectiveSlider: ()=> <AffectiveSlider onChange={()=>{}} />,
        };

        return inputType[type]();
    };

    return (
            <div className={`question-wrap question-wrap-${type}`}>
                <span class="error-wrap" hidden={!error}>{error}</span>
                <span className="question-label">{usedQuestion}</span>
                <AnswerInput className="question-answer" type={type} answers={answers} p={p} />
                {/*<input value={value} setValue={setValue}/>*/}
            </div>

    )
}

function App() {
    useEffect(()=> {
        let {startTimestamp} = window;
        startTimestamp = startTimestamp || Date.now();
        window.startTimestamp = startTimestamp;
    }, []);

    const [answers, setAnswers] = useState([]);

    const setAnswer = (answer, index) => {
        return (answer) => {
            const newAnswers = [...answers][index] = answer;
            setAnswers(newAnswers);
        }
    };

    const [currentlyVisibleQuestion, setCurrentlyVisibleQustion] = useState(0);
    const prevQuestion = ()=>{ setCurrentlyVisibleQustion(currentlyVisibleQuestion - 1) };
    const nextQuestion = ()=>{ setCurrentlyVisibleQustion(currentlyVisibleQuestion + 1) };

  return (
    <div className="App">
      <header className="App-header">
        <div className="question-screen">
            {
                questions.map((questionData, i) =>
                    <Question {...questionData} key={questionData.question} setAnswer={setAnswer(i)}/>
                )
            }
            <button disabled={currentlyVisibleQuestion <= 0} className="prev-question" onClick={prevQuestion}>poprzednie</button>
            <button disabled={currentlyVisibleQuestion >= questions.length} className="next-question" onClick={nextQuestion}>kolejne</button>
        </div>
      </header>
    </div>
  );
}

export default App;
