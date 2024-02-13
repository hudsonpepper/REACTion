import { createContext, useState, useContext } from "react";

// Create our game context using createContext()
export const GameContext = createContext();

export const useTheme = () => useContext(GameContext);

let intervalId;

export default function GameProvider({ children }) {
  const [gameState, setGameState] = useState(0);
  const [targetCounter, setTargetCounter] = useState(0);
  const [countdownClock, setCountdownClock] = useState(20);
  const [leftPos, setLeftPos] = useState(50);
  const [topPos, setTopPos] = useState(50);

  const updateGameState = (num) => {
    return setGameState(num);
  };

  // const updateTargetCounter = (num) => {
  //     return setTargetCounter(num);
  // }

  const updateCountdownClock = (num) => {
    return setCountdownClock(num);
  };

  const updatePosition = () => {
    setLeftPos(Math.random() * 90);
    setTopPos(Math.random() * 90);
  };

  const endGame = (props) => {
    clearInterval(intervalId);
    updateGameState(0);
    updateCountdownClock(20);
  };

  const readyHandler = (e) => {
    e.preventDefault();

    let clockActual = countdownClock;
    setTargetCounter(0);
    updateGameState(1);
    // call render target
    renderTarget(e);
    // start timer for game
    intervalId = setInterval(() => {
      clockActual = clockActual - 1;
      updateCountdownClock(clockActual);
      if (clockActual <= 0) {
        endGame();
      }
    }, 1000);
  };

  const renderTarget = (e) => {
    console.log("target Rerendered");
    if (gameState != 0) {
      setGameState(gameState * -1);
      console.log(gameState);
      setTargetCounter(targetCounter + 1);
      updatePosition();
    }
    if (targetCounter >= 9) {
      endGame();
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        targetCounter,
        countdownClock,
        leftPos,
        topPos,
        renderTarget,
        readyHandler,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
