import { useState } from 'react';
import { useTheme } from '../utils/GameContext';
import Auth from '../utils/auth';

const GameUI = () => {
    const {gameState, setGameState, intervalId, setIntervalId, targetCounter, setTargetCounter, buttonPressTimes, setButtonPressTimes, scoreHandler, endGame, earlyEnd, movement, setMovement, timeSetting, setTimeSetting, targetSetting, setTargetSetting} = useTheme();
    const [countdownClock, setCountdownClock] = useState(20);

    const readyHandler = (e) => {
        if (intervalId != 0) {
            clearInterval(intervalId);
        }
        setCountdownClock(timeSetting)
        setTargetCounter(targetSetting)
        e.preventDefault();
        setButtonPressTimes([Date.now()]);
        let clockActual = timeSetting; 
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

    const movementClicker = (e) => {
        e.preventDefault();
        setMovement(e.target[Object.keys(e.target)[1]].value);
    }

    const speedClicker = (e) => {
        e.preventDefault();
        setSpeed(e.target[Object.keys(e.target)[1]].value);
    }

    const timeClicker = (e) => {
        e.preventDefault();
        setTimeSetting(e.target[Object.keys(e.target)[1]].value);
    }

    const targetClicker = (e) => {
        e.preventDefault();
        setTargetSetting(e.target[Object.keys(e.target)[1]].value);
    }


    return (
        <div className='game-header-bar'>
            {gameState == 0 ? <h2>Hit all the targets as fast as you can!</h2> : null }
            {gameState == 0 ? <button className="ready-btn" onClick={readyHandler}>Ready?</button> : <button className="ready-btn" onClick={earlyEnd}>End Run</button> }
            {gameState == 0 ? null : <h2>TIME REMAINING: {countdownClock}</h2>}
            {gameState == 0 ? null : <h2>TARGETS HIT: {targetCounter}</h2>}
            {gameState == 0 && Auth.loggedIn() && buttonPressTimes.length > 0 ? <button className="ready-btn" onClick={scoreHandler}>Save Score?</button> : null}
            {gameState == 0 ? 
            <div className='flex-row'>
                <details className="dropdown dropdown-top">
                    <summary className="m-1 dropdown-btn btn">Movement</summary>
                    <ul className="absolute p-2 shadow menu dropdown-content z-[1] bg-white-100 bg-opacity-100 rounded-box w-52">
                        <li><a value={0} onClick={movementClicker}>None</a></li>
                        <li><a value={1} onClick={movementClicker}>Standard</a></li>
                        <li><a value={2} onClick={movementClicker}>Evasive</a></li>
                    </ul>
                </details>
                <details className="dropdown dropdown-top">
                    <summary className="m-1 dropdown-btn btn">Speed</summary>
                    <ul className="absolute p-2 shadow menu dropdown-content z-[1] bg-white-100 bg-opacity-100 rounded-box w-52">
                        <li><a value={0.5} onClick={speedClicker}>Slow</a></li>
                        <li><a value={1} onClick={speedClicker}>Standard</a></li>
                        <li><a value={2} onClick={speedClicker}>Fast</a></li>
                    </ul>
                </details>
                <details className="dropdown dropdown-top">
                    <summary className="m-1 dropdown-btn btn">Time</summary>
                    <ul className="absolute p-2 shadow menu dropdown-content z-[1] bg-white-100 bg-opacity-100 rounded-box w-52">
                        <li><a value={20} onClick={timeClicker}>20sec</a></li>
                        <li><a value={60} onClick={timeClicker}>60sec</a></li>
                    </ul>
                </details>
                <details className="dropdown dropdown-top">
                    <summary className="m-1 dropdown-btn btn"># Targets</summary>
                    <ul className="absolute p-2 shadow menu dropdown-content z-[1] bg-white-100 bg-opacity-100 rounded-box w-52">
                        <li><a value={10} onClick={targetClicker}>10</a></li>
                        <li><a value={20} onClick={targetClicker}>20</a></li>
                        <li><a value={30} onClick={targetClicker}>30</a></li>
                    </ul>
                </details>
            </div>
            : null }

        </div>
    )
}

export default GameUI;
