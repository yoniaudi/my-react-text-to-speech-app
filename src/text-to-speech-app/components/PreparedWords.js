import React from 'react';

function PreparedWords(props) {
    let speechDuration = 0;
    return (
        <div className="prepared-words">
            {props.preparedWords.length > 0 && ( <div>
                    <h3>Prepared Words:</h3>
                    <ul className="list-of-recorded-words">
                        {props.preparedWords.map((word, index) => (
                            <li key={index}>
                                {word} -> {' '}
                                {props.wordTimings[index] ? (
                                    <>
                                        {props.wordTimings[index].startTime}
                                        {' - '}
                                        {speechDuration += props.wordTimings[index].endTime - props.wordTimings[index].startTime}
                                    </>
                                ) : ('N/A')}
                            </li>
                        ))}
                    </ul>
            </div>
            )}
        </div>
    );}

export default PreparedWords;