import React from "react";
import { Configuration, OpenAIApi } from "openai";

const oaiConfig = new Configuration({
  organization: "org-vV3sYibXFeOTvkmc2Br9Ik7p",
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
});

export default oaiConfig;
