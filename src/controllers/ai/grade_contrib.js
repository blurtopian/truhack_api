const axios = require('axios');
const { sendOne } = require("../../middleware");
const _ = require("lodash");

// GitHub API endpoint for commit details
const GITHUB_API_URL = 'https://api.github.com';

const grade_contrib =
  ({ Contribution }, { config }) =>
  async (req, res, next) => {
    const { repoOwner, repoName, commitHash } = req.body;

    if (!repoOwner || !repoName || !commitHash) {
      return res.status(400).send('Missing repoOwner, repoName, or commitHash');
    }

    try {
      const result = await analyzeCommit(repoOwner, repoName, commitHash);
      return sendOne(res, result);
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  };

// Function to analyze commit
const analyzeCommit = async (repoOwner, repoName, commitHash) => {
  try {
    // Fetch commit details from GitHub API
    const commitUrl = `${GITHUB_API_URL}/repos/${repoOwner}/${repoName}/commits/${commitHash}`;
    const { data: commitData } = await axios.get(commitUrl);

    // Basic details
    const author = commitData.commit.author.name;
    const date = commitData.commit.author.date;
    const message = commitData.commit.message;

    // Get diff stats
    const files = commitData.files;
    const totalFiles = files.length;
    const totalLinesAdded = files.reduce((sum, file) => sum + file.additions, 0);
    const totalLinesDeleted = files.reduce((sum, file) => sum + file.deletions, 0);

    // Nature of changes (basic example based on commit message)
    let nature = "Other";
    if (/fix/i.test(message)) {
      nature = "Bug fix";
    } else if (/feat/i.test(message)) {
      nature = "New feature";
    } else if (/refactor/i.test(message)) {
      nature = "Refactoring";
    } else if (/doc/i.test(message)) {
      nature = "Documentation";
    } else if (/perf/i.test(message)) {
      nature = "Performance";
    } else if (/security/i.test(message)) {
      nature = "Security";
    }

    // Scope of impact (basic example based on number of files)
    let scope = "Low";
    if (totalFiles > 10) {
      scope = "High";
    } else if (totalFiles > 5) {
      scope = "Medium";
    }

    return {
      author,
      date,
      message,
      totalFiles,
      totalLinesAdded,
      totalLinesDeleted,
      nature,
      scope,
    };
  } catch (error) {
    console.error("Error analyzing commit:", error);
    throw error;
  }
};

module.exports = {
  grade_contrib,
  analyzeCommit,
};
