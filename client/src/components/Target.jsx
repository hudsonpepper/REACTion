import '../App.css'


const Target = ({onClickHandler}) => {
    // onclick, delete this and render new button (get new button as prop from create portal)
    

    // insert math and set position
    let styling = {left: (5 + Math.random()*90) + '%', top: (5 + Math.random()*90) + '%'};

    return (
        <button style={styling} id='target' onClick={onClickHandler}>IT WORKED!</button>
    )
}

export default Target;