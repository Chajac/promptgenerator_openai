import { Configuration } from "openai";

const oaiConfig = (apiKey: string) =>
	new Configuration({
		organization: "org-vV3sYibXFeOTvkmc2Br9Ik7p",
		apiKey: apiKey,
	});

export default oaiConfig;
