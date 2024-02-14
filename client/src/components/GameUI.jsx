import { useState } from 'react';
import { useTheme } from '../utils/GameContext';

const GameUI = () => {
    const {gameState, targetCounter, countdownClock, readyHandler, earlyEnd} = useTheme();
    
    return (
        <div className='game-header-bar'>
            {gameState == 0 ? <h2>Hit all the targets as fast as you can!</h2> : null }
            {gameState == 0 ? <button className="ready-btn" onClick={readyHandler}>Ready?</button> : <button className="ready-btn" onClick={earlyEnd}>End Run</button> }
            {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
            {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
        </div>
    )
}

export default GameUI;
