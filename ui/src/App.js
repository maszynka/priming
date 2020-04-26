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


const Question = ({question, type, answers, p})=> {
    //const [placeholder, setPlaceholder] = useState(question);
    const [usedQuestion, setUsedQuestion] = useState(question);
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

    const AnswerInput = ({className, type, answers, p, onClick})=> {

        const inputType = {
            select: () => (
                <select className={className} value={value} onChange={setValue} onClick={onClick}>
                    {answers.map(
                        (answer) => {
                            console.log(answer);
                            const optionValue = encodeURI(answer);
                            return <option key={optionValue} value={optionValue}>{answer}</option>
                        }
                    )}
                </select>
            ),
            input: () => <input className={className} value={value} onChange={setValue}/>,
            affectiveSlider: ()=>null,
        }
        const prevQuestion = ()=>{};
        const nextQuestion = ()=>{
            setCurrentQustion()
        };
        return inputType[type]();
    };
    return (
            <div className="question-wrap">
                <span className="question-label">{usedQuestion}</span>
                <AnswerInput className="question-answer" type={type} answers={answers} p={p} onClick={onClick}/>
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

    const [currentQuestion, setCurrentQustion] = useState(0);


  return (
    <div className="App">
      <header className="App-header">
        <div className="question-screen">

            {questions.map(questionData => <Question {...questionData} key={questionData.question}/>)}
            <AffectiveSlider/>
            <button className="prev-question" onClick={prevQuestion}></button>
            <button className="next-question" onClick={nextQuestion}></button>
        </div>
      </header>
    </div>
  );
}

export default App;
