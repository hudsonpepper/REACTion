import Target from '../../components/Target'
import GameUI from '../../components/GameUI'
import { useTheme } from '../../utils/GameContext';
import './style.css'
const GamePage = () => {    

    const {gameState, renderTarget} = useTheme();

    return (
        <div className='overarching-container'>
            <GameUI />

            <div className='game-viewport'>
                {gameState == 0 ? null : <Target onClickHandler={renderTarget}/>}
            </div>
        </div>
    );
}

export default GamePage;