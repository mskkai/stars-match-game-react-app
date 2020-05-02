import React from 'react';
import { gameEndStatus } from './Constants';


const PlayAgain = (props) => {

    return (
        <>

            <div className='game-end-status'
                style={{
                    color: props.gameStatus === gameEndStatus.TIMER_END ? 'red' :
                        props.gameStatus === gameEndStatus.WRONG_SEL_END ? 'orange' : 'green'
                }}
            > {props.gameStatus}</div>
            <button className='game-done' onClick={() => props.startGame()}>Play Again?</button>
        </>
    )
}

export default PlayAgain;