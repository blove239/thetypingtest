import React, { Component } from 'react';
import '../css/stats.css';

const Stats = () => {
    return (
        <main className='statHolder'>
            <div className='statBoxes'>CPM</div>
            <div className='statBoxes'>WPM</div>
            <div className='statBoxes'>ACC</div>
        </main>
    );
}


export default Stats;