import '../App.css'
import { useTheme } from '../utils/GameContext';

const Target = ({ onClickHandler }) => {
    // onclick, delete this and render new button (get new button as prop from create portal)
    const { leftPosInitial, topPosInitial, leftPosFinal, topPosFinal } = useTheme();
    console.log("I rerendered")
    console.log(`Left: ${leftPosInitial} -> ${leftPosFinal} || Top: ${topPosInitial} -> ${topPosFinal}`)
    // insert math and set position
    const keyframes = {
        '@keyframes moveBackAndForth': {
            '0%': { left: `${leftPosInitial}%`, top: `${topPosInitial}%` },
            '100%': { left: `${leftPosFinal}%`, top: `${topPosFinal}%` },
        },
    };

    let styling = {
        position: 'absolute',
        left: (leftPosInitial) + '%',
        top: (topPosInitial) + '%',
        animation: `moveBackAndForth 1s linear infinite alternate`,
        // left: 100 + '%',
        // top: 100 + '%',
    };
    let imgStyling = {

    }
    return (
        <>
            {/* <style>
                {`@keyframes moveBackAndForth: {
                    0% { left: ${leftPosInitial}%; top: ${topPosInitial}%; },
                    100% {{ left: ${leftPosFinal}%; top: ${topPosFinal}%}; }
                }`}
            </style> */}
            <style>{`${Object.keys(keyframes).map((key) => key + '{' + Object.keys(keyframes[key]).map((keyframe) => keyframe + '{' + Object.keys(keyframes[key][keyframe]).map((property) => property + ':' + keyframes[key][keyframe][property]).join(';') + '}').join('') + '}').join('')}`}</style>
            <button style={styling} className="max-w-10" onClick={onClickHandler}><img style={imgStyling} src="../../public/target.png" /></button>
        </>
    )
}

export default Target;