import React from 'react';

function TextArea(props) {
    return (
        <textarea
            rows="10"
            cols="60"
            value={props.text}
            onChange={props.onChange}
            placeholder="Enter text here..."
        />
    );}

export default TextArea;