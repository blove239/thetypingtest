import React, { useState, useEffect } from 'react';
import publicIp from 'public-ip';
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries }) => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false)
    const [name, setName] = useState('');
    const [netWPM, setNetWPM] = useState(0);
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
        setLocation(jsonData);
        console.log(location);
    }
    useEffect(() => {
        getLeaderboard();
        getLocation();
        const postRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://localhost:8000'
            },
            body: JSON.stringify({
                name: 'Brandon',
                netWPM: 90,
                location: 'Canada',
                mobile: false,
            })
        };
        fetch('http://localhost:8000/api/scores/', postRequestOptions)
            .then(response => response.json())
            .then(data => data);

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className='leaderboard-wrapper'>
            <h1>Leaderboard</h1>
            <h3>Net WPM</h3>
            {wordPerMin - incorrectEntries}
            <input placeHolder='Your Name' type='text' name='name'/>
            <ol>
                {fetchedLeaderboard ? leaderboard.map((x, index) =>
                    <li key={index}> Name: {x.name} NetWPM: {x.netWPM} location: {x.location} mobile: {x.mobile} </li>
                ) : null}
            </ol>
            {Object.keys(location)}
            {Object.values(location)}
        </div>
    );
};

export default Leaderboard;