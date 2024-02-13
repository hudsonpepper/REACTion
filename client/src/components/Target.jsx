import '../App.css'
import { useTheme } from '../utils/GameContext';

const Target = ({onClickHandler}) => {
    // onclick, delete this and render new button (get new button as prop from create portal)
    const { leftPos, topPos } = useTheme();

    
    // insert math and set position
    let styling = {
        position: 'absolute',
        left: (leftPos) + '%', 
        top: (topPos) + '%',

        // left: 100 + '%',
        // top: 100 + '%',
    };
    // let imgStyling = {
    //     height: `${5}%`,
    //     maxHeight: `${5}%`
    // }
    // console.log("I re-rendered!");
    return (
        <button style={styling} className="max-w-3" onClick={onClickHandler}><img style={imgStyling} src="../../public/target.png"/></button>
    )
}

export default Target;