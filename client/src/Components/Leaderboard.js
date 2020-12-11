import React, { useState, useEffect } from 'react';
import publicIp from 'public-ip';
import { isMobile } from "react-device-detect";
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries, isTestDone }) => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false)
    const [name, setName] = useState('');
    const [netWPM, setNetWPM] = useState(128);
    const [ip, setIp] = useState('Unknown');
    const [isNameLenValid, setIsNameLenValid] = useState(true);
    const [isNameAlphaNum, setIsNameAlphaNum] = useState(true);

    const re = new RegExp(/^[a-z0-9]+$/, 'i')

    const getLeaderboard = async () => {
        const response = await fetch('http://localhost:8000/api/scores/');
        const jsonData = await response.json();
        if (response && !response.error) {
            setLeaderboard(jsonData)
            setFetchedLeaderboard(true);
        }
    };

    const getIP = async () => {
        const userIp = await publicIp.v4();
        setIp(userIp);
    }

    const submitScore = async () => {
        if (name.length < 2 || name.length > 64) {
            setIsNameLenValid(false);
        }
        if(re.test(name) !== true) {
            setIsNameAlphaNum(false);
        }
        else {
            setIsNameLenValid(true);
            const postRequestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://localhost:8000'
                },
                body: JSON.stringify({
                    name: name,
                    netWPM: netWPM,
                    location: 'Unknown',
                    mobile: isMobile,
                    ip: ip,
                })
            };
            await fetch('http://localhost:8000/api/scores', postRequestOptions)
                .then(response => response.json())
                .then(data => data);
        }

    }

    useEffect(() => {
        getLeaderboard();
        getIP();
    }, []);

    return (
        <div className='leaderboard-wrapper'>
            <h1 className='leaderboard-heading'>Leaderboard</h1>
            <div>
                {fetchedLeaderboard ?
                    leaderboard.map((x) => {
                        return (<div>{x.name}</div>)
                    }) :
                    null
                }
            </div>
            <h2 className='leaderboard-heading'>Submit your result</h2>
            <span className='text-bold'>Your Score:</span>
            <span> {netWPM} Net Words Per Minute (WPM)</span>
            <p>Enter your name below to submit your result</p>
            <div>
                <input
                    placeHolder='Your Name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <button onClick={submitScore}>SUBMIT</button>
                {isNameLenValid ? null :
                    <div className='name-valid-warning'>Names must be at least two characters and no more than 64 characters in length</div>}
                {isNameAlphaNum ? null :
                <div className='name-valid-warning'>Names may only contain alphanumerical characters</div>}
            </div>
        </div>
    );
};

export default Leaderboard;