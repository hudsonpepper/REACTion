import "../App.css";
import { useTheme } from "../utils/GameContext";

const Target = ({ onClickHandler }) => {
    // onclick, delete this and render new button (get new button as prop from create portal)
    const { leftPos, topPos, leftPosOffset, topPosOffset, bezierP1x, bezierP1y, bezierP2x, bezierP2y, speed} = useTheme();
    console.log("I rerendered")
    //console.log(`Left: ${leftPos} w/offset ${leftPosOffset} || Top: ${topPos} w/offset ${topPosOffset}`)
    console.log(bezierP1x, bezierP1y, bezierP2x, bezierP2y)
    let topDirection, leftDirection;

    if (leftPos + leftPosOffset > 90) {
        leftDirection = -1;
    }
    else if (leftPos - leftPosOffset < 10) {
        leftDirection = 1;
    }
    else {
        // Randomizes between +-1: Math.round(Math.random()) randomly picks 0 or 1, *2 makes 0 or 2, -1 makes -1 or 1
        leftDirection = (Math.round(Math.random()) * 2) - 1
    }
    const leftPosFinal = leftPos + leftPosOffset * leftDirection

    if (topPos + topPosOffset > 90) {
        topDirection = -1;
    }
    else if (topPos - topPosOffset < 10) {
        topDirection = 1;
    }
    else {
        // Randomizes between +-1: Math.round(Math.random()) randomly picks 0 or 1, *2 makes 0 or 2, -1 makes -1 or 1
        topDirection = (Math.round(Math.random()) * 2) - 1
    }
    const topPosFinal = topPos + topPosOffset * topDirection
    //console.log(`Left: ${leftPos} -> ${leftPosFinal} || Top: ${topPos} -> ${topPosFinal}`)
    // insert math and set position
    const keyframes = {
        '@keyframes moveBackAndForth': {
            '0%': { left: `${leftPos}%`, top: `${topPos}%` },
            '100%': { left: `${leftPosFinal}%`, top: `${topPosFinal}%` },
        },
    };

    let styling = {
        position: 'absolute',
        left: (leftPos) + '%',
        top: (topPos) + '%',
        animation: `moveBackAndForth ${speed}s cubic-bezier(${bezierP1x}, ${bezierP1y}, ${bezierP2x}, ${bezierP2y}) infinite alternate`,
        // left: 100 + '%',
        // top: 100 + '%',
    };
    let imgStyling = {

    }
    return (
        <>
            {/* <style>
                {`@keyframes moveBackAndForth: {
                    0% { left: ${leftPos}%; top: ${topPos}%; },
                    100% {{ left: ${leftPosFinal}%; top: ${topPosFinal}%}; }
                }`}
            </style> */}
            <style>{`${Object.keys(keyframes).map((key) => key + '{' + Object.keys(keyframes[key]).map((keyframe) => keyframe + '{' + Object.keys(keyframes[key][keyframe]).map((property) => property + ':' + keyframes[key][keyframe][property]).join(';') + '}').join('') + '}').join('')}`}</style>
            <button style={styling} className="max-w-10" onMouseDown={onClickHandler}><img style={imgStyling} src="../../public/target.png" /></button>
        </>
    )
}

export default Target;
