import React from 'react';

const Square = (props) => {
    return (
        <button className={props.highlight ? "square-box bg-gray" : "square-box"} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default Square;