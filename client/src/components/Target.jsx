import '../App.css'
import { useTheme } from '../utils/GameContext';

const Target = ({onClickHandler}) => {
    // onclick, delete this and render new button (get new button as prop from create portal)
    const { leftPos, topPos } = useTheme();

    // insert math and set position
    let styling = {left: (leftPos) + '%', top: (topPos) + '%'};
    console.log("I re-rendered!");
    return (
        <button style={styling} id='target' onClick={onClickHandler}>IT WORKED!</button>
    )
}

export default Target;