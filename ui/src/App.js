import React, {useEffect, useState } from 'react';
// import { Input } from 'antd';

import logo from './logo.svg';
import './App.css';
import AffectiveSlider from "./AffectiveSlider";

const questions = [
    {
        question: 'Płeć',
        type: 'select',
        answers: ['Mężczyzna, Kobieta, Wolę nie mówić, Inna'],
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
    }
];

const Question = ({question, type, answers, p})=> {
    const [placeholder, setPlaceholder] = useState(question);
    const startFun = ()=>{
        setPlaceholder(p);
        setTimeout(()=>{
            setPlaceholder(question);
        }, 50)
    };

    const [value, setValue] = useState('');

    useEffect(()=>{
        console.log('fired')
        setTimeout(startFun, 500)
    }, []);
    
    return (
    <div className="question-wrap">
        <div className="question-label">{question}</div>
        <input value={value} setValue={setValue}/>
    </div>
    )
}

function App() {
    useEffect(()=> {
        let {startTimestamp} = window;
        startTimestamp = startTimestamp || Date.now();
        window.startTimestamp = startTimestamp;
    }, []);
  return (
    <div className="App">
      <header className="App-header">
          {questions.map(questionData => <Question {...questionData} key={questionData.question}/>)}
        <AffectiveSlider/>
      </header>
    </div>
  );
}

export default App;
