import React from 'react';
import Utils from './Utils';


const CreateStars = (props) => {
    const arrayOfStars = Utils.range(1, props.count);
    return (
        <>
            {
                arrayOfStars.map(starId => {
                    return <div key={starId} className="star"></div>
                })
            }
        </>
    )
}


export default CreateStars;