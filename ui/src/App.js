import React, {useEffect, useState, useRef} from 'react';
import {Question} from './components/Question';
import './App.css';
import {generateStatSettings} from "./statSettings";
import {measureFps, screenSizes} from './systemData';
import axios from 'axios';


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

const SplashScreen = ({setShowSplashScreen, statSettings}) => {
    return <div className="splashScreen">
        <h1>Badanie aktualnego nastroju uzytkownikow{statSettings.primed ? '.' : ''}</h1>
        <p>
            Grupa studentów SWPS we Wrocławiu zaprasza do wzięcia udziału w badaniu nastroju.
            Średni czas trwania badania zajmuje 2 minuty.
        </p>
        <p>
            Badanie jest anonimowe i w każdej chwili można zrezygnować z jego realizacji. Wyniki analizowane będą zbiorczo oraz udostępnione za darmo dla wszystkich zainteresowanych.
            Biorąc udział w ankiecie wyrażasz zgodę na przetwarzanie zebranych danych w celu ich analizy.
        </p>
        <button className="btn-main" style={{marginTop: "2em"}} onClick={()=>{setShowSplashScreen(false)}}>Rozpocznij badanie</button>

    </div>
}

const EndScreen = () => {
    return <div className="splashScreen">
        <h1>Dziękujemy za udział w badaniu!</h1>
        <p>
            W celu otrzymania informacji na temat wyników badania prosimy o wysłanie e-maila na adres
            dbogusz1@st.swps.edu.pl wraz z informacją, że jesteście Państwo zainteresowani otrzymaniem wyników w.w. badania.
        </p>
    </div>
}



function App() {
    const [ready, setReady] = useState(true);
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [showEndScreen, setShowEndScreen] = useState(false);
    const [statSettings, setStatSettings] = useState({});
    const formDataRef = useRef(initialFormData);

    useEffect(() => {
        const statSettings = generateStatSettings();

        formDataRef.current.statSettings = statSettings;
        formDataRef.current.systemStats = {};
        formDataRef.current.systemStats.ua = navigator.userAgent;
        formDataRef.current.systemStats.screenSizes = screenSizes;

        setStatSettings(statSettings);

        measureFps.then((fps)=>{
            formDataRef.current.systemStats.fps = fps;
        });

        setReady(true);

    }, []);

    const handleChange = (e) => {
        if (!e || !e.target) return;
        const {target: {value, name}} = e;
        formDataRef.current = {
            ...formDataRef.current,
            [name]: value.trim()
        };
    };

    const handleSubmit = (e) => {

        formDataRef.current.statSettings.endTimestamp = Date.now();

        e.preventDefault();
        setShowEndScreen(true);

        const url = 'http://localhost:3000';

        axios.post(url, {...formDataRef.current})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const [currentlyVisibleQuestion, setCurrentlyVisibleQustion] = useState(0);

    const nextQuestion = () => {
        setCurrentlyVisibleQustion(currentlyVisibleQuestion + 1)
    };

    return (
        !ready ? '' :
            <div className="App">

                { !showEndScreen ? (showSplashScreen ?
                <SplashScreen setShowSplashScreen={setShowSplashScreen} statSettings={statSettings}/> :
                <form onSubmit={handleSubmit}>
                    <div className="question-screen">
                        Pytanie {currentlyVisibleQuestion + 1} z {questions.length}
                        {
                            questions.map((questionData, i) =>
                                <Question
                                    {...questionData}
                                    key={questionData.question}
                                    handleChange={handleChange}
                                    visible={currentlyVisibleQuestion === i}
                                    nextQuestion={nextQuestion}
                                    nextQuestionHidden={
                                        currentlyVisibleQuestion + 1 >= questions.length
                                    }
                                    statSettings={statSettings}
                                />
                            )
                        }
                    </div>
                </form>
                ) :
                    <EndScreen/>
                }
            </div>

    );
}

export default App;
