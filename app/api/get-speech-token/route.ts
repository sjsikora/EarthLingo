import axios from "axios";

/*
    * This is a function that comes from Microsoft's Speech Sample.

    * This is an API route. On a GET method at /api/get-speech-token
    * we will use our speechKey and speechRegion to get a token from 
    * Microsoft's Speech API.
*/
export async function GET() {

    const speechKey = process.env.NEXT_PUBLIC_SPEECH_KEY
    const speechRegion = process.env.NEXT_PUBLIC_SPEECH_REGION

    // Set the headers for our request to Microsoft's Speech API
    const headers = { 
        headers: {
            'Ocp-Apim-Subscription-Key': speechKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        // Wait for the token to be returned from the Speech API
        const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
        return Response.json({ token: tokenResponse.data, region: speechRegion });
    } catch (error) {
        // If there is an error, return the error
        return Response.json({ error: "Something went wrong with our servers." });
    }

}