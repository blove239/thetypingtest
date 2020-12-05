import React, { useState, useEffect } from 'react';
import publicIp from 'public-ip';
import { isMobile } from "react-device-detect";
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries, isTestDone }) => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false)
    const [name, setName] = useState('');
    const [netWPM, setNetWPM] = useState(wordPerMin - incorrectEntries);
    const [location, setLocation] = useState('Unknown');

    const getLeaderboard = async () => {
        const response = await fetch('http://localhost:8000/api/scores/');
        const jsonData = await response.json();
        setLeaderboard(jsonData);
        setFetchedLeaderboard(true);
    };

    const getLocation = async () => {
        const userIp = await publicIp.v4();
        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://www.geoplugin.net/json.gp?ip=${userIp}`);
        const jsonData = await response.json();
        setLocation(jsonData.geoplugin_countryCode);
        console.log(location);
    }

    const submitScore = async () => {
        const postRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:8000'
            },
            body: JSON.stringify({
                name: name,
                netWPM: netWPM,
                location: location,
                mobile: isMobile,
            })
        };
        await fetch('http://localhost:8000/api/scores/', postRequestOptions)
            .then(response => response.json())
            .then(data => data);
    }

    useEffect(() => {
        getLeaderboard();
        getLocation();
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className='leaderboard-wrapper'>
            <h1>Leaderboard</h1>
            <h3>Net WPM</h3>
            {isTestDone ? 
            <div>
                <input
                    placeHolder='Your Name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            NET WPM:
            {netWPM}
                {" "}
                  COUNTRY:{location}
                {" "}
                  isMobile: {isMobile ? "TRUE" : "FALSE"}
                <button onClick={submitScore}>SUBMIT</button>
            </div> : null}
            <ol>
                {fetchedLeaderboard ? leaderboard.map((x, index) =>
                    <li key={index}> Name: {x.name} NetWPM: {x.netWPM} location: {x.location} mobile: {x.mobile ? "TRUE" : "FALSE"} </li>
                ) : null}
            </ol>



        </div>
    );
};

export default Leaderboard;