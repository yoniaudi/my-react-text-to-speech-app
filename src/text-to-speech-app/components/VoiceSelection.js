import React from 'react';

function VoiceSelection(props) {
    return (
      <div className="voice-selection">
          <select value={props.value ? props.value.name : ''} onChange={props.onChange}>
              {window.speechSynthesis.getVoices().map((voice) => (
                  <option key={voice.name} value={voice.name}>
                      {voice.name}
                  </option>
              ))}
          </select>
      </div>
    );
}

export default VoiceSelection;