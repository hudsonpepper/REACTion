import { createContext, useState, useContext } from 'react';

// Create our game context using createContext()
export const GameContext = createContext();

export const useTheme = () => useContext(GameContext);

let intervalId;

export default function GameProvider({ children }) {
    const [gameState, setGameState] = useState(0);
    const [targetCounter, setTargetCounter] = useState(0);
    const [countdownClock, setCountdownClock]= useState(20);
    const [leftPos, setLeftPos]= useState(50);
    const [topPos, setTopPos]= useState(50);

    const updateGameState = (num) => {
        return setGameState(num);
    }

    const updateTargetCounter = (num) => {
        return setTargetCounter(num);
    }

    const updateCountdownClock = (num) => {
        return setCountdownClock(num);
    }

    const updatePosition = () => {
        setLeftPos(Math.random()*90);
        setTopPos(Math.random()*90);
    }

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
        intervalId = setInterval(() => {
            clockActual = clockActual - 1;
            updateCountdownClock(clockActual);
            if (clockActual <= 0) {
                updateGameState(0);
                e.target.removeAttribute("disabled", "");
                e.target.removeAttribute("hidden", "");
                clearInterval(intervalId)
                updateCountdownClock(20);
            }
        }, 1000);
    }

    const renderTarget = (e) => {
        if (gameState != 0) {
            setGameState(gameState * -1);
            updatePosition();
            setTargetCounter(targetCounter + 1);
        }
        if (targetCounter >= 9) {
            setGameState(0);
            e.target.parentElement.children[0].removeAttribute("disabled", "");
            e.target.parentElement.children[0].removeAttribute("hidden", "");
            clearInterval(intervalId);
            // console.log(targetCounter, countdownClock);
        }
    }

    return (
        <GameContext.Provider value={{
            gameState, 
            targetCounter, 
            countdownClock,
            leftPos,
            topPos,
            renderTarget, 
            readyHandler,
        }}>
            {children}
        </GameContext.Provider>
    )
}