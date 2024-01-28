import { ConsoleLoggingListener } from "microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.browser/ConsoleLoggingListener";

export class PhoneticAssessmentResults {

    myPhonicScore: {
        [key: string]: {
            score: number;
            count: number;
        }
    }

    latestResults: PhoneticAssessmentLatestResults | undefined;

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

        let totalScore: number = 0;
        let missprouncedWords: string[] = [];

        let worstWord: string = '';
        let worstScore: number = 100;
        let worstWordPhonemes: string[] = [];
        
        result.NBest.forEach(nbest => {
            totalScore = Math.round(nbest.PronunciationAssessment.AccuracyScore * 100) / 100;

            nbest.Words.forEach(word => {

                let thisWordIstheWorstScore = false;

                const errorType = word.PronunciationAssessment.ErrorType;
                const tempScore = word.PronunciationAssessment.AccuracyScore;
                const wordString = word.Word;

                if (tempScore < worstScore) {
                    worstScore = tempScore;
                    worstWord = wordString
                    thisWordIstheWorstScore = true;
                    worstWordPhonemes = [];
                }

                if (errorType === "Mispronunciation") missprouncedWords.push(word.Word);

                word.Phonemes.forEach(phoneme => {

                    const phonemeName = phoneme.Phoneme;
                    if(thisWordIstheWorstScore) worstWordPhonemes.push(phonemeName);
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

        this.latestResults = {
            totalScore: totalScore,
            worstWord: {
                word: worstWord,
                phonemes: worstWordPhonemes,
                score: worstScore
            },
            missprouncedWords: missprouncedWords
        }

        this.setLocalStorage();
    }

    setLocalStorage() {
        window.localStorage.setItem('phonogramResults', JSON.stringify(this.myPhonicScore));
    }

    sortMyPhonogram(): [string, {
        score: number;
        count: number;
    }][] {
        const sortedPhonogram = Object.entries(this.myPhonicScore).sort((a, b) => a[1].score - b[1].score);
        return sortedPhonogram;
    }

    getMyLatestResults(): PhoneticAssessmentLatestResults | undefined {
        return this.latestResults;
    }
}

interface PronunciationAssessment {
    AccuracyScore: number;
    ErrorType: string;
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

export interface PhoneticAssessmentLatestResults {
    totalScore: number;
    worstWord: {
        word: string;
        phonemes: string[];
        score: number;
    };
    missprouncedWords: string[];
}