import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

export class Phonic_Results {

    myPhonicScore: {
        [key: string]: {
            score: number;
            count: number;
        }
    }

    constructor(myPhonicScore?: {
        [key: string]: {
            score: number;
            count: number;
        }
    }) {
        this.myPhonicScore = myPhonicScore || {};
    }
    

    // This function will take in a result for pronuciationAssessment and use that to update the myPhonicScore object

    async updatePhonics(result: Phonogram) {
        console.log("I am here");

        result.NBest.forEach(nbest => {
            nbest.Words.forEach(word => {
                word.Phonemes.forEach(phoneme => {
                    const phonemeName = phoneme.Phoneme;
                    const accuracyScore = phoneme.PronunciationAssessment.AccuracyScore;
                    
                    //Case phoneme is present
                    // Case phoneme is present
                        if (this.myPhonicScore[phonemeName] && this.myPhonicScore[phonemeName].count !== undefined && this.myPhonicScore[phonemeName].score !== undefined) {
                            this.myPhonicScore[phonemeName].score = Math.round(((this.myPhonicScore[phonemeName].score * this.myPhonicScore[phonemeName].count + accuracyScore) / (this.myPhonicScore[phonemeName].count + 1)) * 100) / 100;
                            this.myPhonicScore[phonemeName].count++;
                        }
                    // Case phoneme is not present 
                    else {
                        this.myPhonicScore[phonemeName] = { score: Math.round(accuracyScore * 100) / 100, count: 1};
                    }
                });
            });
        });

        this.setLocalStorage();
    }

    setLocalStorage() {
        console.log(this.myPhonicScore);
        window.localStorage.setItem('phonogramResults', JSON.stringify(this.myPhonicScore));
    }

    sortMyPhonogram(): [string, {
        score: number;
        count: number;
    }][] {
        const sortedPhonogram = Object.entries(this.myPhonicScore).sort((a, b) => b[1].score - a[1].score);
        return sortedPhonogram;
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