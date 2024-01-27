"use client";
import React, { useState } from 'react';
import MicrophoneButton from '../MicrophoneButton';
import { getTokenOrRefresh } from '../../../js/token_util';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import ReferenceText from '../ReferenceText';
import { Result } from 'postcss';

type SpeechHandlerProps = {
    
};

const SpeechHandler:React.FC<SpeechHandlerProps> = () => {

    const [referenceText, updateReferenceText] = useState('people');
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [microphoneOn, setMicrophoneOn] = useState(false);
    const [pronouncationResult, setPronouncationResult] = useState<speechsdk.PronunciationAssessmentResult>();


    // This function will 
    async function speechToResults() {
      
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        var pronunciationAssessmentConfig = new speechsdk.PronunciationAssessmentConfig(
            referenceText, 
            speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
            speechsdk.PronunciationAssessmentGranularity.Phoneme,
            false
        );

        pronunciationAssessmentConfig.applyTo(recognizer);
        

        setMicrophoneOn(true);

        recognizer.recognizeOnceAsync((result: speechsdk.SpeechRecognitionResult) => {
            setPronouncationResult(speechsdk.PronunciationAssessmentResult.fromResult(result));
        });

        setMicrophoneOn(false);
    }

    return <div>
        <div className='flex justify-center flex flex-col'>

            hello 
            <ReferenceText text={referenceText}/>
            <MicrophoneButton isMicrophoneOn={microphoneOn} whenClicked={speechToResults}/>
        </div>


    </div>
}
export default SpeechHandler;