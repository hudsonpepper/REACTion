import { useState } from 'react';
import { useTheme } from '../utils/GameContext';

const GameUI = () => {
    const {gameState, targetCounter, countdownClock, readyHandler} = useTheme();
    
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
