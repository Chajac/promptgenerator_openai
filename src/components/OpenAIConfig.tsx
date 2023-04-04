import React from "react";
import { Configuration, OpenAIApi } from "openai";
import Settings from "./Settings";

const oaiConfig = (apiKey: string) =>
	new Configuration({
		organization: "org-vV3sYibXFeOTvkmc2Br9Ik7p",
		apiKey: apiKey,
		//apiKey: process.env.REACT_APP_OPEN_AI_KEY,
	});

export default oaiConfig;
