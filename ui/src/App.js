import React, {useEffect} from 'react';
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
        question: 'Wiek',
        type: 'select',
        answers: ['poniżej 18', '18-29', '30-39', '40-49', '50-60' , 'powyżej 60 roku'],
        p: 'Dobro'
    },
    {
        question: 'Wiek',
        type: 'select',
        answers: ['poniżej 18', '18-29', '30-39', '40-49', '50-60' , 'powyżej 60 roku'],
        p: 'Dobro'
    },
]

function App() {
    useEffect(()=> {
        let {startTimestamp} = window;
        startTimestamp = startTimestamp || Date.now();
        window.startTimestamp = startTimestamp;
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        <AffectiveSlider/>
      </header>
    </div>
  );
}

export default App;
