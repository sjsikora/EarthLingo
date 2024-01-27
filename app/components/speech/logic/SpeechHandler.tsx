"use client";
import React, { useState } from 'react';
import MicrophoneButton from '../MicrophoneButton';
import { getTokenOrRefresh } from '../../../js/token_util';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import ReferenceText from '../ReferenceText';
import { Phonogram } from '../../../js/types';

type SpeechHandlerProps = {
    
};

const SpeechHandler:React.FC<SpeechHandlerProps> = () => {

    const [referenceText, updateReferenceText] = useState("That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos.");
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [microphoneOn, setMicrophoneOn] = useState(false);
    const [pronouncationResult, setPronouncationResult] = useState<Phonogram>();


    // This function will reconize speech from the user and updated pronouncationResult with the result.
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
            if(result.reason === speechsdk.ResultReason.RecognizedSpeech) {
                

                var resultJson = JSON.parse(result.properties.getProperty(speechsdk.PropertyId.SpeechServiceResponse_JsonResult)) as Phonogram;
                
                console.log(resultJson);
                
                setPronouncationResult(resultJson);
            }

            setMicrophoneOn(false);
        });

    }

    return <div>
        <div className='flex justify-center flex flex-col'>

            {microphoneOn ? <p className='text-3xl'> SPEAKING </p> : <p className='text-3xl'> NOT SPEAKING </p>}
            {displayText}
            <ReferenceText text={referenceText}/>
            <MicrophoneButton isMicrophoneOn={microphoneOn} whenClicked={speechToResults}/>

        </div>


    </div>
}
export default SpeechHandler;