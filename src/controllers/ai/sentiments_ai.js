const axios = require('axios');
const { sendOne } = require("../../middleware");
const _ = require("lodash");

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

const sentiments_ai =
  ({ Sentiment }, { config }) =>
  async (req, res, next) => {
    console.log("req.body:", req.body);

    const { tweets } = req.body;
    console.log("tweets:", tweets);

    if (_.isEmpty(tweets)) {
      return res.status(400).send('Missing tweets');
    }

    try {
      const result = await analyzeTweets(tweets);
      return sendOne(res, result);
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };

// Function to analyze commit

// Function to analyze a single tweet
const analyzeTweets = async (tweets) => {
  try {
    // Convert the array of texts to a format that the AI can process
    const textData = tweets.map((tweet, index) => `${index + 1}. "${tweet.tweets_content}"`).join("\n");
    const prompt = `Here is a list of election-related texts. For each, extract the candidate's name (if any) and the sentiment ("positive", "negative", or "neutral"). Return only those with a valid candidate name in the following JSON format: [{ "candidate": "candidate_name", "sentiment": "positive | negative | neutral" }]. Here are the texts:\n\n${textData}`
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",  // Using GPT-3.5 for cheaper option
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const sentimentResp = response.data.choices[0].message.content.trim();
    console.log("Sentiment Analysis:", sentimentResp);

    const result = JSON.parse(sentimentResp);
    console.log("result:", result);

    return result;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw error;
  }
}

module.exports = {
  sentiments_ai,
};
