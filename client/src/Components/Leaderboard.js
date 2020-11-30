import React from 'react';
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries }) => {
    return (
        <div className='leaderboard-wrapper'>
            <h1>Leaderboard</h1>
            <h3>Net WPM</h3>
                
                {wordPerMin - incorrectEntries}
            
        </div>
    );
};

export default Leaderboard;