import { useState } from 'react';
import { useTheme } from '../utils/GameContext';
import Auth from '../utils/auth';

const GameUI = () => {
    const {gameState, targetCounter, countdownClock, readyHandler, buttonPressTimes, scoreHandler} = useTheme();
    
    return (
        <div className='game-header-bar'>
            {gameState == 0 ? <h2>Hit all the targets as fast as you can!</h2> : null }
            {gameState == 0 ? <button className="ready-btn" onClick={readyHandler}>Ready?</button> : null }
            {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
            {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
            {gameState == 0 && Auth.loggedIn() && buttonPressTimes.length > 0 ? <button onClick={scoreHandler}>Save Score?</button> : null}
        </div>
    )
}

export default GameUI;
