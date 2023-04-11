import React, { Fragment, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ArtistSelect from "./components/ArtistSelect";
import NegModifers from "./components/NegativeModifers";
import PositiveModifers from "./components/PositiveModifiers";
import StyleModifiers from "./components/StyleModifers";
import ShowPrompt from "./components/showprompt/ShowPrompt";
import createPrompt from "./components/StringCreation";
import GlobalStyle from "./components/styled/Theme";
import Settings from "./components/Settings";
import {
	GridContainer,
	GridItem,
	PromptInput,
	TwoColGrid,
	VerticalSeparator,
} from "./components/styled/Grid";
import WrittenPrompt from "./components/WrittenPrompt";

function App() {
	//const [prompt, setPrompt] = useState("");
	const [genprompt, setgenPrompt] = useState(null);
	const [getArtists, setGetArtists] = useState(null);
	const [getStyle, setgetStyle] = useState(null);
	const [getNegMod, setGetNegMod] = useState(null);
	const [getPosMod, setGetPosMod] = useState(null);
	const [apiKey, setApiKey] = useState("None");
	const [settings, setSettings] = useState({});
	const prompt = createPrompt(
		getStyle,
		genprompt,
		getArtists,
		getPosMod,
		getNegMod
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
