import React, { useState, useEffect, useRef } from 'react';
import { NAME_MIN_LEN, NAME_MAX_LEN } from '../utils/constants'
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Filter from 'bad-words';
import publicIp from 'public-ip';
import '../css/leaderboard.css';

const Leaderboard = ({ wordPerMin, incorrectEntries, isTestDone, isSubmitted, setIsSubmitted }) => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false)
    const [name, setName] = useState('');
    const [netWPM, setNetWPM] = useState(250);
    const [ip, setIp] = useState('Unknown');
    const [isNameLenValid, setIsNameLenValid] = useState(true);
    const [isNameAlphaNum, setIsNameAlphaNum] = useState(true);
    const [isNameClean, setIsNameClean] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [userPostId, setUserPostId] = useState(null);
    const [cannotConnect, setCannotConnect] = useState(false);
    const re = new RegExp(/^[a-z0-9]+$/, 'i');

    const filter = new Filter();
    const scoreScrollRef = useRef();

    const getLeaderboard = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/scores/');
            const jsonData = await response.json();
            if (response && !response.error) {
                setLeaderboard(jsonData);
                setFetchedLeaderboard(true);
            }
        } catch (err) {
            setCannotConnect(true);
        }

    };

    const getIP = async () => {
        const userIp = await publicIp.v4();
        setIp(userIp);
    }

    const submitScore = async (e) => {
        e.preventDefault();
        if (name.length < NAME_MIN_LEN || name.length > NAME_MAX_LEN) {
            setIsNameLenValid(false);
        }
        else if (re.test(name) !== true && name !== '') {
            setIsNameAlphaNum(false);
        }
        else if (filter.isProfane(name)) {
            setIsNameClean(false);
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
            setFetchedLeaderboard(false);
            await fetch('http://localhost:8000/api/scores', postRequestOptions)
                .then(response => response.json())
                .then((data) => {
                    setUserPostId(data)
                });
            await getLeaderboard();
            setSubmitting(false);
            setIsSubmitted(true);
        }
    }

    const executeScroll = () => {
        if (!scoreScrollRef.current === undefined) {
            scoreScrollRef.current.scrollIntoView({
                block: "nearest",
                inline: "start"
            });
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            executeScroll();
        }
    }, [isSubmitted]);

    useEffect(() => {
        getLeaderboard();
        getIP();
    }, []);

    return (
        <div className='leaderboard-popup'>
            {isSubmitted ? null : <>
                <div className='row '>
                    <div className='column'>
                        <h2 className='leaderboard-sub-heading'>Submit your result</h2>
                        <span className='leaderboard-sub-heading'>Enter your name below to submit your result</span>
                        <form onSubmit={submitScore}>
                            <input
                                className='name-input leaderboard-sub-heading'
                                placeholder='Your Name'
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <button
                                type='submit'
                                className='submit-button'
                                disabled={submitting}
                            >
                                <FontAwesomeIcon icon={faArrowCircleRight} />
                            </button>
                            {isNameLenValid ? null :
                                <div className='name-valid-warning'>Names must be at least two characters and no more than 32 characters in length</div>}
                            {isNameAlphaNum ? null :
                                <div className='name-valid-warning'>Names may only contain alphanumerical characters</div>}
                            {isNameClean ? null :
                                <div className='name-valid-warning'>Names may not contain profanities.</div>}
                        </form>
                    </div>
                    <div className='column'>
                        <div className='stat-container'>
                            <div className='stat-boxes'>
                                <div className='stat-heading'>Your Result</div>
                                {netWPM}
                                <div className='align-right'>Net WPM</div>
                            </div>
                        </div>

                    </div>
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
