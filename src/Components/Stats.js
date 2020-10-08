import React, { useState, useEffect, useRef } from 'react';
import '../css/stats.css';

const Stats = ({ testWords, userInputWords, currentWordNum, currentCharNum, isTestActive, resetTestState }) => {
    const [charPerMin, setCharPerMin] = useState(0);
    const [wordPerMin, setWordPerMin] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalTypedChars, setTotalTypedChars] = useState(0);
    const [totalCorrectChars, setTotalCorrectChars] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isTestActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 0.1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [seconds, isTestActive]);

    useEffect(() => {
        if (resetTestState) {
            setCharPerMin(0);
            setWordPerMin(0);
            setSeconds(0);
        }
        calcWPM();
        calcCPM();
    }, [userInputWords, seconds, resetTestState])
    const prevUserInputWordsRef = useRef();

    useEffect(() => {
        prevUserInputWordsRef.current = userInputWords[currentWordNum];
        calcAccuracy();
    }, [userInputWords])

    const prevUserInputWords = prevUserInputWordsRef.current;

    const calcWPM = () => {
        const wpm = Math.round((currentWordNum / seconds) * 60);
        setWordPerMin((Number.isNaN(wpm)) ? 0 : wpm)
    }

    const calcCPM = () => {
        const cpm = Math.round((currentCharNum / seconds) * 60);
        setCharPerMin((currentCharNum < testWords[0].length)
            ? 0 : (Number.isNaN(cpm)) ? 0 : cpm)
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
        // deletions don't affect stats
        if (prevUserInputWords !== undefined && !(prevUserInputWords.length > userInputWords[currentWordNum].length)) {
            isCharCorrect();
        }
        if (userInputWords[currentWordNum] === '') {

        }
    }

    return (
        <main className='statHolder'>
            <div className='statBoxes'>WPM: {wordPerMin}</div>
            <div className='statBoxes'>CPM: {charPerMin}</div>
            <div className='statBoxes'>ACC: {totalTypedChars === 0 ? 0 : Math.round((totalCorrectChars / totalTypedChars) * 100)}%</div>
        </main>
    );
}


export default Stats;