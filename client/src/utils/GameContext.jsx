import { createContext, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RUN } from '../utils/mutations';
// Create our game context using createContext()
export const GameContext = createContext();

export const useTheme = () => useContext(GameContext);

export default function GameProvider({ children }) {
    const [intervalId, setIntervalId] = useState(0);
    const [gameState, setGameState] = useState(0);
    const [targetCounter, setTargetCounter] = useState(0);

    // Game Settings
    const [movement, setMovement] = useState(1);
    const [speed, setSpeed] = useState(1);
    // const [difficultyModifier, setDifficultyModifier] = useState(1)
    const [timeSetting, setTimeSetting] = useState(20);
    const [targetSetting, setTargetSetting] = useState(10);

    const [leftPos, setLeftPos] = useState(50);
    const [topPos, setTopPos] = useState(50);

    // Animation Endpoint
    // const [isAnimated, setIsAnimated] = useState(false);
    const [leftPosOffset, setLeftPosOffset] = useState(0);
    const [topPosOffset, setTopPosOffset] = useState(0);

    // Animation Bezier
    // const [isBezier, setIsBezier] = useState(false);
    const [bezierP1x, setBezierP1x] = useState(1 / 3);
    const [bezierP1y, setBezierP1y] = useState(1 / 3);
    const [bezierP2x, setBezierP2x] = useState(2 / 3);
    const [bezierP2y, setBezierP2y] = useState(2 / 3);

    const [buttonPressTimes, setButtonPressTimes] = useState([]);
    const [addRun, { error, data }] = useMutation(ADD_RUN);


    const updatePosition = () => {
        setLeftPos(10 + Math.random() * 80);
        setTopPos(10 + Math.random() * 80);
        if (movement >= 1) {
            setLeftPosOffset(Math.random() * 30);
            setTopPosOffset(Math.random() * 30);
            if (movement >= 2) {
            // Change animation from linear to bezier
                setBezierP1x(Math.random());
                setBezierP1y(Math.random());
                setBezierP2x(Math.random());
                setBezierP2y(Math.random());
            } else {
                setBezierP1x(1 / 3);
                setBezierP1y(1 / 3);
                setBezierP2x(2 / 3);
                setBezierP2y(2 / 3);
            }
        }
        else {
            setLeftPosOffset(0);
            setTopPosOffset(0)
        }
    }

    const calcModifier = () => {
        let val1;
        let val2;
        if (movement == 0) val1 = 0.7;
        else if (movement == 1) val1 = 1;
        else if (movement == 2) val1 = 1.2;
        if (speed == 0.5) val2 = 1.3;
        else if (speed == 1) val2 = 1;
        else if (speed == 2) val2 = 0.6;
        return val1*val2;
    }

    const scoreHandler = async () => {
        const timeOfPress = buttonPressTimes.map((index) => index - buttonPressTimes[0])
        setButtonPressTimes([])
        const avgTime = timeOfPress[timeOfPress.length - 1] / (timeOfPress.length - 1);
        console.log(avgTime)
        console.log(Math.round(100000 / avgTime))
        console.log(calcModifier());
        const runObj = {
            runtime: timeOfPress[timeOfPress.length - 1],
            targetNumber: (timeOfPress.length - 1),
            difficultyModifier: calcModifier(),
            score: Math.round(100000 / avgTime)
        }
        console.log("RunObj: ", runObj)
        try {
            const { data } = await addRun({
                variables: { ...runObj },
            });
            console.log("DATA Return", data)
            console.log(data.addRun.token)
            localStorage.setItem("id_token", data.addRun.token)
        } catch (e) {
            console.error(e);
        }
    }
    const endGame = (intervalNum) => {
        setGameState(0);
        setTargetCounter(0);
        clearInterval(intervalNum)
    }


    const renderTarget = (e) => {
        setButtonPressTimes([...buttonPressTimes, Date.now()])
        // setIsAnimated(true)
        //setIsBezier(true)
        if (gameState != 0) {
            setGameState(gameState * -1);
            setTargetCounter(targetCounter + 1);
            updatePosition();
            if (targetCounter >= (targetSetting - 1)) {

                endGame(intervalId);
            }
        }
    }

    return (
        <GameContext.Provider value={{
            gameState,
            setGameState,
            targetCounter,
            setTargetCounter,
            leftPos,
            topPos,
            leftPosOffset,
            topPosOffset,
            bezierP1x,
            bezierP1y,
            bezierP2x,
            bezierP2y,
            buttonPressTimes,
            setButtonPressTimes,
            intervalId,
            setIntervalId,
            renderTarget,
            scoreHandler,
            endGame,
            speed,
            setSpeed,
            movement,
            setMovement,
            timeSetting,
            setTimeSetting,
            targetSetting,
            setTargetSetting
        }}>
            {children}
        </GameContext.Provider>
    )
}
