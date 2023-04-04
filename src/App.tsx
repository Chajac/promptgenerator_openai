import React, { Fragment, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import TextField from "./components/TextField";
import ArtistSelect from "./components/ArtistSelect";
import NegModifers from "./components/NegativeModifers";
import PositiveModifers from "./components/PositiveModifiers";
import StyleModifiers from "./components/StyleModifers";
import RangeSlider from "./components/RangeSlider";
import { Configuration, OpenAIApi } from "openai";
import oaiConfig from "./components/OpenAIConfig";
import ShowPrompt from "./components/showprompt/ShowPrompt";
import createPrompt from "./components/StringCreation";
import GlobalStyle from "./components/styled/Theme";
import { Button } from "./components/styled/ButtonStyle";
import { Flex } from "./components/styled/Flex";
import ModalWindow from "./components/ModalWindow";
import Settings from "./components/Settings";
import {
	GridContainer,
	GridItem,
	PromptInput,
	TwoColGrid,
	VerticalSeparator,
} from "./components/styled/Grid";
import OpenAiGen from "./components/OpenAiGen";
import WrittenPrompt from "./components/WrittenPrompt";

/* // Open AI settings
const oaiConfig = new Configuration({
  organization: "org-vV3sYibXFeOTvkmc2Br9Ik7p",
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
});
 */
function App() {
	//const [prompt, setPrompt] = useState("");
	const [genprompt, setgenPrompt] = useState(null);
	const [getArtists, setGetArtists] = useState(null);
	const [getStyle, setgetStyle] = useState(null);
	const [getNegMod, setGetNegMod] = useState(null);
	const [getPosMod, setGetPosMod] = useState(null);
	const [apiKey, setApiKey] = useState("None");
	const [settings, setSettings] = useState({});
	const [temperature, setTemperature] = useState(0.5);
	const [queryLength, setqueryLength] = useState(0.5);
	const [promptWeight, setpromptWeight] = useState(0);
	const [posmodWeight, setposmodWeight] = useState(0);
	const [negmodWeight, setnegmodWeight] = useState(0);

	const prompt = createPrompt(
		getStyle,
		genprompt,
		getArtists,
		getPosMod,
		getNegMod
		// promptWeight,
		// posmodWeight,
		// negmodWeight
	);
	return (
		<Fragment>
			<GlobalStyle />
			<body>
				<GridContainer>
					<Settings setApiKey={setApiKey} setSettings={setSettings} />
					<div className="Title">
						<h1 className="blackletter">Prompting the Prompter</h1>
						<div className="titleSeparator">
							<div className="separatorText">
								Write your prompt
							</div>
						</div>
					</div>
					<PromptInput>
						<WrittenPrompt
							settings={settings}
							getGenPrompt={setgenPrompt}
							apiKey={apiKey}
						/>
					</PromptInput>
					<div className="titleSeparator"></div>
					<TwoColGrid>
						<GridItem className="left">
							<div>Style Select</div>
							<StyleModifiers getStyle={setgetStyle} />
						</GridItem>
						<VerticalSeparator />
						<GridItem className="right">
							<div className="ArtistT">Artist Select</div>
							<ArtistSelect getArtists={setGetArtists} />
						</GridItem>
					</TwoColGrid>
					<div className="titleSeparator"></div>
					<GridItem className="posMods">
						<div className="posContainer">
							<div className="posModT">Modifier Select</div>
							<PositiveModifers getPosMod={setGetPosMod} />
						</div>
					</GridItem>
					<div className="titleSeparator"></div>
					<ShowPrompt
						prompt={prompt}
						{...{
							getStyle,
							genprompt,
							getArtists,
							getPosMod,
							getNegMod,
						}}
					/>
					<GridItem style={{ visibility: "hidden" }}>
						Negative Modifiers
						<NegModifers getNegMod={setGetNegMod} />
					</GridItem>
				</GridContainer>
			</body>
		</Fragment>
	);
}

export default App;
