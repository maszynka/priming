import React, {useEffect, useState, useRef} from 'react';
import {Question} from './components/Question';
import './App.css';
import {generateStatSettings, statSettings} from "./statSettings";


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
        answers: ['poniżej 18', '18-29', '30-39', '40-49', '50-60', 'powyżej 60 roku'],
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

const SplashScreen = () => {
    return <div className="splashScreen">
        <h1>Badanie aktualnego nastroju uzytkownikow{statSettings.primed ? '.' : ''}</h1>
        <p>
            Prezentowana ankieta bada nastroj uzytkownikow
        </p>
        <p>
            Wyniki analizowane będą zbiorczo oraz udostępnione za darmo dla wszystkich zainteresowanych.
            Biorąc udział w ankiecie wyrażasz zgodę na przetwarzanie zebranych danych w celu ich analizy.
        </p>

    </div>
}

function App() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        generateStatSettings();
        setReady(true);
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
    const prevQuestion = () => {
        setCurrentlyVisibleQustion(currentlyVisibleQuestion - 1)
    };
    const nextQuestion = () => {
        setCurrentlyVisibleQustion(currentlyVisibleQuestion + 1)
    };

    return (
        ready ? '' :
            <div className="App">
                <SplashScreen/>
                <form>
                    <div className="question-screen">
                        {
                            questions.map((questionData, i) =>
                                <Question
                                    {...questionData}
                                    key={questionData.question}
                                    handleChange={handleChange}
                                    visible={currentlyVisibleQuestion === i}
                                />
                            )
                        }
                        <button disabled={currentlyVisibleQuestion <= 0} className="prev-question"
                                onClick={prevQuestion}>poprzednie
                        </button>
                        <button disabled={currentlyVisibleQuestion >= questions.length} className="next-question"
                                onClick={nextQuestion}>kolejne
                        </button>
                        <button type="submit" onClick={handleSubmit}/>
                    </div>
                </form>
            </div>

    );
}

export default App;
