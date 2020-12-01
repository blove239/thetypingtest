import React, { useState, useEffect, useRef } from 'react';
import { AVERAGE_WORD, SIXTY_SECONDS } from '../utils/constants'
import '../css/stats.css';
import Leaderboard from './Leaderboard';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Stats = ({ testWords, userInputWords, currentWordNum, currentCharNum, isTestActive, isTestDone, resetTestState, resetTest }) => {
    const [wordPerMin, setWordPerMin] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalTypedChars, setTotalTypedChars] = useState(0);
    const [totalCorrectChars, setTotalCorrectChars] = useState(0);
    const [incorrectEntries, setInCorrectEntries] = useState(0);
    
    useEffect(() => {
        let interval = null;
        if (isTestActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 0.05);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [seconds, isTestActive]);

    useEffect(() => {
        if (resetTestState) {
            setWordPerMin(0);
            setSeconds(0);
            setTotalTypedChars(0);
            setTotalCorrectChars(0);
        }
        calcInCorrectEntires();
        calcWPM();
    }, [userInputWords, seconds, resetTestState])

    const prevUserInputWordsRef = useRef();
    useEffect(() => {
        prevUserInputWordsRef.current = userInputWords[currentWordNum];
        calcAccuracy();
    }, [userInputWords])
    const prevUserInputWords = prevUserInputWordsRef.current;

    const calcInCorrectEntires = () => {
        let currentlyIncorrect = 0;
        userInputWords.forEach((element,index) => {
            for(let i = 0; i < element.length; i++) {
                if(element[i] !== testWords[index][i]){
                    currentlyIncorrect += 1;
                }
            }
        });
        setInCorrectEntries(currentlyIncorrect);
    }

    const calcWPM = () => {
        const wpm = Math.round(totalTypedChars / AVERAGE_WORD / (seconds / SIXTY_SECONDS));
        setWordPerMin((Number.isNaN(wpm) || !isFinite(wpm)) ? 0 : wpm)
    }

    const isCharCorrect = () => {
        if (userInputWords[currentWordNum].slice(-1) === testWords[currentWordNum][currentCharNum - 1]) {
            setTotalCorrectChars(totalCorrectChars + 1)
            setTotalTypedChars(totalTypedChars + 1)
        } else {
            setTotalTypedChars(totalTypedChars + 1)
        }
    }

    const calcAccuracy = () => {
        if (prevUserInputWords !== undefined && !(prevUserInputWords.length > userInputWords[currentWordNum].length)) {
            isCharCorrect();
        }
    }

    return (
        <div>
            <Popup
                open={isTestDone}
                modal
                trigger={<button className='leaderboard-button'> Leaderboard </button>}
            >
                {close => (
                    <React.Fragment>
                        <Leaderboard 
                            wordPerMin={wordPerMin}
                            incorrectEntries={incorrectEntries}
                        />

                        <button
                            className="button"
                            onClick={() => {
                                close();
                            }}
                        >
                            close modal
                        </button>
                    </React.Fragment>
                )
                }
            </Popup>
            <div className='stat-container'>
                <div className='stat-boxes'>
                    <div className='stat-heading'>Words Per Min.</div>
                    {wordPerMin}
                </div>
            </div>
            <div className='stat-container'>
                <div className='stat-boxes'>
                    <div className='stat-heading'>Accuracy</div>
                    {totalTypedChars === 0 ? 0 : Math.round((totalCorrectChars / totalTypedChars) * 100)}
                    <span className='percent-sign'>%</span>
                </div>
            </div>
        </div>

    );
}

export default Stats;