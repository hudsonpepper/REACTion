import '../App.css'

const Target = ({onClickHandler}) => {
    // onclick, delete this and render new button (get new button as prop from create portal)
    

    // insert math and set position
    
    let styling = {
        left: (Math.random()*90) + '%',
        top: (Math.random()*90) + '%',
        height: '10%',
        width: '10%',
    };

    return (
        <button style={styling} id='target' onClick={onClickHandler}><img src="../../public/target.png"/></button>
    )
}

export default Target;