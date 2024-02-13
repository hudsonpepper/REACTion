import { useState } from 'react';
import { useTheme } from '../utils/GameContext';

const GameUI = () => {
    const {gameState, targetCounter, countdownClock, renderTarget, updateTargetCounter, updateGameState, updateCountdownClock} = useTheme();

    let intervalId;

    const readyHandler = (e) => {
        e.preventDefault();
        e.target.setAttribute("disabled", "");
        e.target.setAttribute("hidden", "");

        let clockActual = countdownClock;
        updateTargetCounter(0);
        updateGameState(1);
        // call render target
        renderTarget(e);
        // start timer for game
        // intervalId = setInterval(() => {
        //     clockActual = clockActual - 1;
        //     updateCountdownClock(clockActual);
        //     if (clockActual <= 0) {
        //         updateGameState(0);
        //         e.target.removeAttribute("disabled", "");
        //         e.target.removeAttribute("hidden", "");
        //         clearInterval(intervalId)
        //         updateCountdownClock(20);
        //     }
        // }, 1000);
    }
    return (
        <div className='game-header-bar'>
            <h1>REACTion</h1>
            <ul>
                <li>Profile / Sign-Up</li>
                <li>Leaderboard</li>
            </ul>
            <button onClick={readyHandler}>Ready?</button>
            {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
            {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
        </div>
    )
}

export default GameUI;
