import { createContext, useState, useContext } from 'react';

// Create our game context using createContext()
export const GameContext = createContext();

export const useTheme = () => useContext(GameContext);

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
        setLeftPos(1*30);
        setTopPos(1*30);
    }

    const renderTarget = (e) => {
        console.log("target Rerendered")
        if (gameState != 0) {
            setGameState(gameState * -1);
            updatePosition();
            setTargetCounter(targetCounter + 1);
        }
        if (targetCounter >= 9 || countdownClock <= 0) {
            setGameState(0);
            setCountdownClock(20)
            console.log("game over")
            e.target.parentElement.children[0].removeAttribute("disabled", "");
            e.target.parentElement.children[0].removeAttribute("hidden", "");
            // clearInterval(intervalId);
            console.log(targetCounter, countdownClock);
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
            updateGameState, 
            updateTargetCounter,
            updateCountdownClock
        }}>
            {children}
        </GameContext.Provider>
    )
}