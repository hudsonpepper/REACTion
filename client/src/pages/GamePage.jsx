import Target from '../components/Target'
import { useState } from 'react';
import { ReactDOM } from 'react';
import { createPortal } from 'react-dom';

const GamePage = () => {
    const [gameState, setGameState] = useState(0);
    const [targetCounter, setTargetCounter] = useState(0);
    const [countdownClock, setCountdownClock]= useState(20);
    let intervalId;

    const readyHandler = (e) => {
        e.preventDefault();

        e.target.setAttribute("disabled", "");
        e.target.setAttribute("hidden", "");

        setTargetCounter(0);
        setCountdownClock(20);
        setGameState(1);
        // call render target
        renderTarget(e);
        // start timer for game
        intervalId = setInterval(() => {
            setCountdownClock(countdownClock - 1);
            if (countdownClock == 0) {
                setGameState(0);
                e.target.removeAttribute("disabled", "");
                e.target.removeAttribute("hidden", "");
                clearInterval(intervalId)
                setCountdownClock(20);
            }
        }, 1000);
    }

    const renderTarget = (e) => {
        // display one hidden target, remove the 'hidden' property
        if (gameState != 0) {
            setGameState(gameState * -1);
            setTargetCounter(targetCounter + 1);
        }
        if (targetCounter == 9) {
            setGameState(0);
            e.target.parentElement.children[0].removeAttribute("disabled", "");
            e.target.parentElement.children[0].removeAttribute("hidden", "");
            clearInterval(intervalId);
        }
        console.log(gameState);
    }

    return (
        <div className='overarching-container'>
            <div className='game-header-bar'>
                <h1>REACTion</h1>
                <ul>
                    <li>Profile / Sign-Up</li>
                    <li>Leaderboard</li>
                </ul>
                {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
                {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
            </div>

            <div className='game-viewport'>
                <button onClick={readyHandler}>Ready?</button>
                {gameState == 0 ? null : <Target onClickHandler={renderTarget}/>}
            </div>
        </div>
    );
}

export default GamePage;