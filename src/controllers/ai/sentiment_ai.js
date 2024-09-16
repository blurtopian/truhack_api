const axios = require('axios');
const { sendOne } = require("../../middleware");
const _ = require("lodash");

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

const sentiment_ai =
  ({ Sentiment }, { config }) =>
  async (req, res, next) => {
    const { tweet } = req.body;

    if (!tweet) {
      return res.status(400).send('Missing tweet');
    }

    try {
      const result = await analyzeTweet(tweet);
      return sendOne(res, result);
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };

// Function to analyze commit
const analyzeTweet = async (text) => {
  console.log('text', text)
  try {
    //const prompt = `Please analyze the sentiment of the following text regarding an election and only reply with one word: "positive", "negative", or "neutral". Here is the text: "${text}"`
    //const prompt = `Analyze the sentiment of the following text regarding an election and the candidate "${candidate}". Reply only in the following JSON format: { "candidate": "candidate_name", "sentiment": "positive | negative | neutral" }. Here is the text: "${text}"`
    const prompt = `Analyze the following text regarding an election. Extract the name of the candidate if mentioned, otherwise set the candidate to null. Additionally, return the sentiment of the text ("positive", "negative", or "neutral"). The response must be in this JSON format: { "candidate": "candidate_name or null", "sentiment": "positive | negative | neutral" }. Here is the text: "${text}"`
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",  // Using GPT-3.5 for cheaper option
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    console.log("response.data.choices[0]:", response.data.choices[0]);

    const sentimentResp = response.data.choices[0].message.content.trim();
    console.log("Sentiment Analysis:", sentimentResp);

    const result = JSON.parse(sentimentResp);
    console.log("result:", result);

    return result;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw error;
  }
};

module.exports = {
  sentiment_ai,
};
