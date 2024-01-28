"use client";
import React, { use, useEffect, useState } from 'react';
import { getTokenOrRefresh } from '../../js/token_util';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"
import { Phonogram, PhoneticAssessmentResults} from '../../js/types';
import MicroPhoneAndReferenceHandler from './MicrophoneAndReferenceHandler';

type SpeechHandlerProps = {
    phonicResults: PhoneticAssessmentResults;
    psudeoValueForRerender: number;
    setPsudeoValueForRerender: React.Dispatch<React.SetStateAction<number>>;
    
};

const SpeechHandler:React.FC<SpeechHandlerProps> = ({phonicResults, psudeoValueForRerender, setPsudeoValueForRerender}) => {

    const [referenceText, setReferenceText] = useState("That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos.");

    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [microphoneisOn, setMicrophoneState] = useState(false);

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
        
        setMicrophoneState(true);

        recognizer.recognizeOnceAsync((result: speechsdk.SpeechRecognitionResult) => {

            setMicrophoneState(false);

            if(result.reason === speechsdk.ResultReason.RecognizedSpeech) {

                var resultJson = JSON.parse(result.properties.getProperty(speechsdk.PropertyId.SpeechServiceResponse_JsonResult)) as Phonogram;
                console.log(resultJson);
                phonicResults.updatePhonics(resultJson);
                setPsudeoValueForRerender(psudeoValueForRerender + 1);

            // In other cases that did not result with a speech recognition result, display the error.
            } else if (result.reason === speechsdk.ResultReason.NoMatch) {
                setDisplayText('Speech could not be recognized. Please try again');
            } else if (result.reason === speechsdk.ResultReason.Canceled) {

                var cancellation = speechsdk.CancellationDetails.fromResult(result);
                setDisplayText(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason === speechsdk.CancellationReason.Error) {
                    setDisplayText(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    setDisplayText(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    setDisplayText(`CANCELED: Did you update the subscription info?`);
                }
            }
        });

    }

    return <div>
        <MicroPhoneAndReferenceHandler
            isMicrophoneOn={microphoneisOn}
            whenMicrophoneClicked={speechToResults}
            referenceText={referenceText}
            setReferenceText={setReferenceText}
        />
    </div>
}
export default SpeechHandler;