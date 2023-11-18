import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import './TextToSpeech.css';

// Text to speech components
import Slider from './components/Slider';
import PreparedWords from './components/PreparedWords';
import TextArea from "./components/TextArea";
import ButtonPanel from "./components/ButtonPanel";
import VoiceSelection from "./components/VoiceSelection";

function TextToSpeech() {

    const [text, setText] = useState(''); // State variable to store the input text
    const [volume, setVolume] = useState(0.5);
    const [wordTimings, setWordTimings] = useState([]); // State variable to store word timings
    const [preparedWords, setPreparedWords] = useState([]); // State variable to store prepared words
    const { speak, cancel, speaking } = useSpeechSynthesis(); // Using the useSpeechSynthesis hook to access speech synthesis functions
    const [selectedVoice, setSelectedVoice] = useState(null);
    //const [speechRate, setSpeechRate] = useState(140); // Words per minute

    useEffect(() => {
        const voices = window.speechSynthesis.getVoices();
        setSelectedVoice(voices[0]); // Set the default voice
    },[]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleVoiceChange = (e) => {
        const selectedVoiceName = e.target.value;
        const selectedVoice = window.speechSynthesis.getVoices().find((voice) => voice.name === selectedVoiceName);
        setSelectedVoice(selectedVoice);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    const handleStartSpeech = () => {
        if (!speaking) {
            // Create an utterance and set its volume
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.volume = volume;

            // Set the selected voice
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Speak the utterance
            speak(utterance);
        }
    };

    const handleStopSpeech = () => {
        cancel();
    };

    const handlePrepare = () => {

        // Split text into words
        const words = text.split(' ');

        // The average number of characters per syllable for English (Need to add pausa for ',.;:' chars)
        const averageCharsPerSyllable = 3;

        // The average reading time per character for English (68 ms per character)
        const averageCharReadingTimeMillis = 68;

        // Calculate the average reading time per syllable for English
        const averageSyllableReadingTimeMillis = averageCharsPerSyllable * averageCharReadingTimeMillis;

        // Initialize variables
        let totalReadingTimeMillis = 0;
        const newWordTimings = [];

        // Function to record timings
        function recordTiming(word) {
            // Calculate the estimated reading time for the word based on its syllables
            const syllables = word.length / averageCharsPerSyllable;
            const estimatedReadingTimeMillis = syllables * averageSyllableReadingTimeMillis;

            // Store the word and its start time in a data structure
            newWordTimings.push({
                word,
                startTime: totalReadingTimeMillis / 1000, // Convert milliseconds to seconds
                endTime: (totalReadingTimeMillis + estimatedReadingTimeMillis) / 1000, // Convert milliseconds to seconds
                readingTime: estimatedReadingTimeMillis / 1000, // Convert milliseconds to seconds
            });

            totalReadingTimeMillis += estimatedReadingTimeMillis;
        }

        // Loop through each word and record time
        for (const i in words) {
            recordTiming(words[i]);
        }

        // Update word timings array
        setWordTimings(newWordTimings);

        // Extract words for rendering
        const preparedWordList = words.map((word) => word.trim()).filter((word) => word.length > 0);
        setPreparedWords(preparedWordList);
    };

    return (
        <div className="text-to-speech">
            <h2>Text To Speech</h2>
            <TextArea text={text} onChange={handleTextChange}/>
            <VoiceSelection value={selectedVoice} onChange={handleVoiceChange}/>
            <ButtonPanel {...{speaking, handleStartSpeech, handleStopSpeech, handlePrepare}}/>
            <Slider title="Volume" value={volume} onChange={handleVolumeChange}/>
            <PreparedWords preparedWords={preparedWords} wordTimings={wordTimings}/>
        </div>
    );
}

export default TextToSpeech;