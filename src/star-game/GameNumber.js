import React from 'react';


const GameNumber = (props) => {
    const num = props.num;
    return (
        <button key={num} className="number" disabled={props.gameIsDone}
            style={{
                backgroundColor: props.status
            }}
            onClick={() => {
                props.performNumberCalc(num, props.status);
            }}>{num}</button>
    );
}

export default GameNumber;