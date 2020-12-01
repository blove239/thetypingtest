import React, { useState, useEffect } from 'react';
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries }) => {
    const [postId, setPostId] = useState(null);
    const [totalReactPackages, setTotalReactPackages] = useState(null);
    const [userData, setUserData] = useState(null);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false)

    const getLeaderboard = async () => {
        const response = await fetch('http://localhost:8000/api/scores/');
        const jsonData = await response.json();
        setUserData(jsonData);
        setFetchedLeaderboard(true);
    };
    console.log(userData)
    useEffect(() => {
        getLeaderboard();

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
            .then(data => setPostId(data.id));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className='leaderboard-wrapper'>
            <h1>Leaderboard</h1>
            <h3>Net WPM</h3>
            Total react packages: {totalReactPackages}

            {wordPerMin - incorrectEntries}
                Returned Id: {postId}
            <ol>
                {fetchedLeaderboard ? userData.map((x, index) =>
                    <li key={index}> Name: {x.name} NetWPM: {x.netWPM} location: {x.location} mobile: {x.mobile} </li>
                ) : null}
            </ol>
        </div>
    );
};

export default Leaderboard;