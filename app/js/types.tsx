import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

export class Phonic_Results {

    myPhonicScore: {
        [key: string]: number;
    }

    constructor(mypPhonicScore?: {[key: string]: number}) {
        this.myPhonicScore = mypPhonicScore || {};
    }
    

    // This function will take in a result for pronuciationAssessment and use that to update the myPhonicScore object

    updatePhonics(result: Phonogram) {


        result.NBest.forEach(nbest => {
            nbest.Words.forEach(word => {
                word.Phonemes.forEach(phoneme => {
                    const phonemeName = phoneme.Phoneme;
                    const accuracyScore = phoneme.PronunciationAssessment.AccuracyScore;

                    // Case phoneme is present
                    if (this.myPhonicScore[phonemeName]) {
                        this.myPhonicScore[phonemeName] = (this.myPhonicScore[phonemeName] + accuracyScore) / 2;
                    }
                    // Case phoeme is not present 
                    else {
                        
                        this.myPhonicScore[phonemeName] = accuracyScore;
                    }
                });
            });
        });

        this.setLocalStorage();
    }

    setLocalStorage() {
        window.localStorage.setItem('phonogramResults', JSON.stringify(this.myPhonicScore));
    }

    sortMyPhonogram(): [string, number][] {
        

        const phonogramArray = Object.entries(this.myPhonicScore);
    
        // Sort the array by score in ascending order
        phonogramArray.sort((a, b) => a[1] - b[1]);
    
        return phonogramArray;
    }


}

interface PronunciationAssessment {
    AccuracyScore: number;
    ErrorType?: string;
    FluencyScore?: number;
    CompletenessScore?: number;
    PronScore?: number;
}

interface Syllable {
    Syllable: string;
    Grapheme: string;
    PronunciationAssessment: PronunciationAssessment;
    Offset: number;
    Duration: number;
}

interface Phoneme {
    Phoneme: string;
    PronunciationAssessment: PronunciationAssessment;
    Offset: number;
    Duration: number;
}

interface Word {
    Word: string;
    Offset: number;
    Duration: number;
    PronunciationAssessment: PronunciationAssessment;
    Syllables: Syllable[];
    Phonemes: Phoneme[];
}

interface NBest {
    Confidence: number;
    Lexical: string;
    ITN: string;
    MaskedITN: string;
    Display: string;
    PronunciationAssessment: PronunciationAssessment;
    Words: Word[];
}

export interface Phonogram {
    Channel: number;
    DisplayText: string;
    SNR: number;
    NBest: NBest[];
}