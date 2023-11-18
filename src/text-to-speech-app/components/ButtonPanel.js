import React from 'react';

function ButtonPannel(props) {
    return (
        <div>
            <button onClick={props.handleStartSpeech} disabled={props.speaking}>Start Speech</button>
            <button onClick={props.handleStopSpeech}>Stop Speech</button>
            <button onClick={props.handlePrepare}>Prepare Text</button>
            {props.speaking && <p>Speaking...</p>}
        </div>
    )}

export default ButtonPannel;