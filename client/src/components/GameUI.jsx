import { useState } from 'react';
import { useTheme } from '../utils/GameContext';
import Auth from '../utils/auth';

const GameUI = () => {
    const {gameState, setGameState, intervalId, setIntervalId, targetCounter, setTargetCounter, buttonPressTimes, setButtonPressTimes, scoreHandler, endGame, earlyEnd, difficultyModifier, setDifficultyModifier} = useTheme();
    const [countdownClock, setCountdownClock] = useState(20);
    const [timeSetting, setTimeSetting] = useState(20);
    const [isTimeUnlimited, setIsTimeUnlimited] = useState(false);

    const readyHandler = (e) => {
        if (intervalId != 0) {
            clearInterval(intervalId);
        }
        setCountdownClock(20) // time setting here
        setTargetCounter(0)
        e.preventDefault();
        setButtonPressTimes([Date.now()]);
        let clockActual = 20; // time setting here
        // Edits game state to allow for target rendering
        setGameState(1);
        // start timer for game
        let newInterval = setInterval(() => {
            clockActual = clockActual - .1;
            setCountdownClock(clockActual.toFixed(1));
            if (clockActual <= 0) {
                endGame(newInterval);
            }
        }, 100);
        setIntervalId(newInterval)
    }
    return (
        <div className='game-header-bar'>
            {gameState == 0 ? <h2>Hit all the targets as fast as you can!</h2> : null }
            {gameState == 0 ? <button className="ready-btn" onClick={readyHandler}>Ready?</button> : <button className="ready-btn" onClick={earlyEnd}>End Run</button> }
            {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
            {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
            {gameState == 0 && Auth.loggedIn() && buttonPressTimes.length > 0 ? <button className="ready-btn" onClick={scoreHandler}>Save Score?</button> : null}

        </div>
    )
}

export default GameUI;
