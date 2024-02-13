import { createContext, useState, useContext } from 'react';

// Create our game context using createContext()
export const GameContext = createContext();

export const useTheme = () => useContext(GameContext);


export default function GameProvider({ children }) {
    const [intervalId, setIntervalId] = useState(0);
    const [gameState, setGameState] = useState(0);
    const [targetCounter, setTargetCounter] = useState(0);
    const [countdownClock, setCountdownClock]= useState(20);
    const [leftPos, setLeftPos]= useState(50);
    const [topPos, setTopPos]= useState(50);
    const [buttonPressTimes, setButtonPressTimes] = useState([]);

    const updatePosition = () => {
        setLeftPos(10 + Math.random()*80);
        setTopPos(10 + Math.random()*80);
    }

    const endGame = (intervalNum) => {
        setGameState(0);
        setCountdownClock(20);
        setTargetCounter(0);
        clearInterval(intervalNum)
    }
    
    const readyHandler = (e) => {
        if (intervalId != 0) {
            clearInterval(intervalId);
        }
        e.preventDefault();
        setButtonPressTimes([Date.now()]);
        let clockActual = countdownClock;
        setGameState(1);
        // call render target
        renderTarget(e);
        // start timer for game
        let newInterval = setInterval(() => {
            clockActual = clockActual - 1;
            setCountdownClock(clockActual);
            if (clockActual <= 0) {
                endGame(newInterval);
            }
        }, 1000);
        setIntervalId(newInterval)
    }

    const renderTarget = (e) => {
        setButtonPressTimes([...buttonPressTimes, Date.now()])
        if (gameState != 0) {
            setGameState(gameState * -1);
            setTargetCounter(targetCounter + 1);
            updatePosition();
            if (targetCounter >= 9) {
                endGame(intervalId);
            }
        }
    }

    return (
        <GameContext.Provider value={{
            gameState, 
            targetCounter, 
            countdownClock,
            leftPos,
            topPos,
            buttonPressTimes,
            intervalId,
            renderTarget, 
            readyHandler,
        }}>
            {children}
        </GameContext.Provider>
    )
}