import { useState } from 'react';
import { useTheme } from '../utils/GameContext';

const GameUI = () => {
    const {gameState, targetCounter, countdownClock, readyHandler} = useTheme();
    
    return (
        <div className='game-header-bar'>
            {gameState == 0 ? <button onClick={readyHandler}>Ready?</button> : null }
            {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
            {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
        </div>
    )
}

export default GameUI;
