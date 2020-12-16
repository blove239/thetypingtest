import React, { useState, useEffect, useRef } from 'react';
import { NAME_MIN_LEN, NAME_MAX_LEN } from '../utils/constants'
import { isMobile } from "react-device-detect";
import publicIp from 'public-ip';
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries, isTestDone }) => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false)
    const [name, setName] = useState('');
    const [netWPM, setNetWPM] = useState(1  );
    const [ip, setIp] = useState('Unknown');
    const [isNameLenValid, setIsNameLenValid] = useState(true);
    const [isNameAlphaNum, setIsNameAlphaNum] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [userPostId, setUserPostId] = useState(null);
    const [cannotConnect, setCannotConnect] = useState(false);
    const re = new RegExp(/^[a-z0-9]+$/, 'i');

    const scoreScrollRef = useRef();

    const getLeaderboard = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/scores/');
            const jsonData = await response.json();
            if (response && !response.error) {
                setLeaderboard(jsonData);
                setFetchedLeaderboard(true);
            }
        } catch(err){
            setCannotConnect(true);
        }
       
    };

    const getIP = async () => {
        const userIp = await publicIp.v4();
        setIp(userIp);
    }

    const submitScore = async () => {
        if (name.length < NAME_MIN_LEN || name.length > NAME_MAX_LEN) {
            setIsNameLenValid(false);
        }
        if (re.test(name) !== true && name !== '') {
            setIsNameAlphaNum(false);
        }
        else {
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
            setSubmitting(true);
            await fetch('http://localhost:8000/api/scores', postRequestOptions)
                .then(response => response.json())
                .then((data) => {
                    setUserPostId(data)
                }
                );
            await getLeaderboard();
            setSubmitting(false);
            setIsSubmitted(true);

        }
    }

    const executeScroll = () => scoreScrollRef.current.scrollIntoView({
        block: "nearest",
        inline: "start"
    });

    useEffect(() => {
        if (isSubmitted) {
            executeScroll();
        }
    }, [isSubmitted])

    useEffect(() => {
        getLeaderboard();
        getIP();
    }, []);

    return (
        <div className='leaderboard-wrapper'>
            {isSubmitted ? null : <>
                <h2 className='leaderboard-heading'>Submit your result</h2>
                <span className='text-bold'>Your Score:</span>
                <span> {netWPM} Net Words Per Minute (WPM)</span>
                <p>Enter your name below to submit your result</p>
                <div>
                    <input
                        placeholder='Your Name'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <button
                        onClick={submitScore}
                        disabled={submitting}
                    >
                        SUBMIT
                </button>
                    {isNameLenValid ? null :
                        <div className='name-valid-warning'>Names must be at least two characters and no more than 64 characters in length</div>}
                    {isNameAlphaNum ? null :
                        <div className='name-valid-warning'>Names may only contain alphanumerical characters</div>}
                </div>
            </>}
            <h1 className='leaderboard-heading'>Leaderboard</h1>
            {cannotConnect ? <div>Cannot connect to the leaderboard, please try again later! </div> : null}
            <table className='leaderboard-results'>
                <tbody>
                    <tr>
                        <th className='table-col-1'>Position</th>
                        <th className='table-col-2'>Name</th>
                        <th className='table-col-3'>Net WPM</th>
                    </tr>
                    
                    {fetchedLeaderboard ?
                        leaderboard.map((data, index) => {
                            if (userPostId !== null && data._id === userPostId.message) {
                                return (
                                    <tr ref={scoreScrollRef} key={index}>
                                        <td className='table-col-1'>{index + 1}</td>
                                        <td className='table-col-2'>{data.name}</td>
                                        <td className='table-col-3'>{data.netWPM}</td>
                                    </tr>)
                            } else {
                                return (
                                    <tr key={index}>
                                        <td className='table-col-1'>{index + 1}</td>
                                        <td className='table-col-2'>{data.name}</td>
                                        <td className='table-col-3'>{data.netWPM}</td>
                                    </tr>)
                            }


                        })
                        : null
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
