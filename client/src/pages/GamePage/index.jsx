import Target from '../../components/Target'
import { useState } from 'react';
import { ADD_RUN } from '../../utils/mutations';

import { ReactDOM } from 'react';
import { createPortal } from 'react-dom';

import './style.css'


const GamePage = () => {
    const [gameState, setGameState] = useState(0);
    const [targetCounter, setTargetCounter] = useState(0);
    const [countdownClock, setCountdownClock]= useState(20);
    let intervalId;
    let startTime;
    let endTime;
    const readyHandler = (e) => {
        e.preventDefault();
        e.target.setAttribute("disabled", "");
        e.target.setAttribute("hidden", "");
        let clockActual = countdownClock;
        setTargetCounter(0);
        setGameState(1);
        // call render target
        renderTarget(e);
        // start timer for game
        intervalId = setInterval(() => {
            clockActual = clockActual - 1;
            setCountdownClock(clockActual);
            if (clockActual <= 0) {
                if(gameState != 0) {
                    console.log("Gamestate", gameState)
                    console.log(targetCounter, countdownClock);
                    ADD_RUN(String(Date.now()), 20, targetCounter)
                }
                setGameState(0);
                e.target.removeAttribute("disabled", "");
                e.target.removeAttribute("hidden", "");
                clearInterval(intervalId)
                setCountdownClock(20);


            }
        }, 1000);
    }

    const renderTarget = (e) => {
        if (gameState != 0) {
            setGameState(gameState * -1);
            setTargetCounter(targetCounter + 1);
        }
        if (targetCounter >= 9) {
            setGameState(0);
            e.target.parentElement.children[0].removeAttribute("disabled", "");
            e.target.parentElement.children[0].removeAttribute("hidden", "");
            clearInterval(intervalId);
            console.log(targetCounter, countdownClock);
            // const run = {
            //     datePlayed: String(Date.now()), 
            //     runtime: countdownClock,
            //     targetNumber: targetCounter
            // }
            const [run, { error, data }] = useMutation(ADD_RUN);
        }
    }

    const addRun = (props) => {
        
    }

    return (
        <div className='overarching-container flex flex-col justify-center'>
            <div className='game-header-bar'>
                <h1>REACTion</h1>
                <ul>
                    <li>Profile / Sign-Up</li>
                    <li>Leaderboard</li>
                </ul>
                {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
                {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
            </div>

            <div className='game-viewport '>
                <button onClick={readyHandler}>Ready?</button>
                {gameState == 0 ? null : <Target onClickHandler={renderTarget}/>}
            </div>
        </div>
    );
}

export default GamePage;