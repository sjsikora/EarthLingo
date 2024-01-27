"use client";
import React, { use, useEffect, useState } from 'react';
import MicrophoneButton from '../MicrophoneButton';
import { getTokenOrRefresh } from '../../../js/token_util';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import ReferenceText from '../ReferenceText';
import { Phonogram, Phonic_Results} from '../../../js/types';

type SpeechHandlerProps = {
    
};

const SpeechHandler:React.FC<SpeechHandlerProps> = () => {

    const [referenceText, updateReferenceText] = useState("That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos.");
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [microphoneOn, setMicrophoneOn] = useState(false);
    const [phonogramResults, setPhonogramResults] = useState<Phonic_Results>();

    // This function will check if myPhonicScore used in phonic_results is in local storage.
    useEffect(() => {
        const phonogramResults = window.localStorage.getItem('phonogramResults');
        if (phonogramResults) {
            setPhonogramResults(new Phonic_Results(JSON.parse(phonogramResults)));
        } else {
            setPhonogramResults(new Phonic_Results());
        }
    });


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
                window.localStorage.setItem('pronouncationResult', JSON.stringify(resultJson));
                phonogramResults?.updatePhonics(resultJson);

            }

            setMicrophoneOn(false);
        });

    }

    return <div>
        <div className='flex justify-center flex flex-col'>

            {microphoneOn ? <p className='text-3xl'> SPEAKING </p> : <p className='text-3xl'> NOT SPEAKING </p>}
            {displayText}
            {phonogramResults?.sortMyPhonogram().map((phonogram) => {
                return <p> {phonogram[0]} : {phonogram[1]} </p>
            })}
            <ReferenceText text={referenceText}/>
            <MicrophoneButton isMicrophoneOn={microphoneOn} whenClicked={speechToResults}/>

        </div>


    </div>
}
export default SpeechHandler;