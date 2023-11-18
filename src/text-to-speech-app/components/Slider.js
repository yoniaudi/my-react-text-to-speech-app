import React from 'react';

function Slider(props) {
    return (
        <div className="slider">
            <p>{props.title}:</p>
            <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );}

export default Slider;