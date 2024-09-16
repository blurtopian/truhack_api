const axios = require('axios');
const { sendOne } = require("../../middleware");
const _ = require("lodash");

// GitHub API endpoint for commit details
const GITHUB_API_URL = 'https://api.github.com';

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
const analyzeTweet = async (tweet) => {
  try {
    const sentiment = "positive";
    const candidate = "Joe Biden";

    return {
      sentiment,
      candidate
    };
  } catch (error) {
    console.error("Error analyzing commit:", error);
    throw error;
  }
};

module.exports = {
  sentiment_ai,
};
