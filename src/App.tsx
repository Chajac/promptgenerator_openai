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
import ShowPrompt from "./components/ShowPrompt";
import createPrompt from "./components/StringCreation";
import GlobalStyle from "./components/styled/Theme";
import { Button } from "./components/styled/ButtonStyle";
import { Flex } from "./components/styled/Flex";
import {
	GridContainer,
	GridItem,
	InnerGrid,
	PromptTitle,
	VerticalGridSeparator,
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

	// function adjustWeight(tdArray: Array<any>, index: number, increment: number) {
	//   tdArray.find((el, ind) => {
	//     if (ind === index) {
	//       console.log(
	//         "matched index:" + index + " with " + el[0] + " weight of:" + el[1]
	//       );
	//       return (el[1] += increment);
	//     }
	//     return el;
	//   });
	//   tdArray.forEach((val, ind) => {
	//     if (ind === index) {
	//       console.log(
	//         "val: " + val + " ind: " + ind + "Check? " + tdArray[ind][1]
	//       );
	//       tdArray[ind][1] += increment;
	//     }
	//   });
	// }

	// const promptMarkUp = prompt?.map((i: any, ind: number) => (
	//   <p
	//     id="hoverCol"
	//     style={{
	//       display: "inline-block",
	//       textAlign: "center",
	//       backgroundColor: randomColorRGBA(0),
	//     }}
	//   >
	//   <PromptP>
	//     {ind}
	//     <br />
	//     {i[0]}
	//     <br />
	//     {i[1]}
	//     <button onClick={() => adjustWeight(prompt, ind, 1)}>Weight Up</button>
	//   </PromptP>
	//   </p>
	// ));
	return (
		<Fragment>
			<GlobalStyle />
			<body>
				<GridContainer>
					<h1 className="blackletter">Prompting the Prompter</h1>
					<div className="titleSeparator">
						<div className="separatorText">Write your prompt</div>
					</div>
					<PromptTitle>
						<WrittenPrompt getGenPrompt={setgenPrompt} />
					</PromptTitle>
					<div className="titleSeparator"></div>
					{/* 					<OpenAiGen
						getGenPrompt={setgenPrompt}
						oAIConfig={oaiConfig}
					/> */}
					{/*           <Flex flex="100%" height="10rem">
            <TextField
              value={prompt}
              onChange={setPrompt}
              placeholder="Prompt input"
            />
          </Flex>
          <Flex flex="100%">
            {
              <Button onClick={() => generatePrompt(prompt)}>
                OpenAI Generate
              </Button>
            }
            <p>{genprompt}</p>
          </Flex> */}
					{/*           <RangeSlider
            min={0}
            max={100}
            step={1}
            value={queryLength}
            onChange={setqueryLength}
          />
          <p>Token Length(4 chars per token):{queryLength}</p>
          <RangeSlider
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={setTemperature}
          />
          <p>Temperature: {temperature}</p>
 */}
					{/* <div>
            <div>
              <RangeSlider
                min={0}
                max={5}
                step={1}
                value={promptWeight}
                onChange={setpromptWeight}
              />
              <p>Prompt weight:{promptWeight}</p>
            </div>
            <div>
              <RangeSlider
                min={0}
                max={5}
                step={1}
                value={posmodWeight}
                onChange={setposmodWeight}
              />
              <p>Pos Mod weight:{posmodWeight}</p>
            </div>
            <div>
              <RangeSlider
                min={-5}
                max={0}
                step={1}
                value={negmodWeight}
                onChange={setnegmodWeight}
              />
              <p>negmodWeight:{negmodWeight}</p>
            </div>
          </div> */}
					<InnerGrid>
						<GridItem className="double">
							<div className="t1">Select your style</div> <br />
							<StyleModifiers getStyle={setgetStyle} />
						</GridItem>
						<VerticalGridSeparator />
						<GridItem className="double">
							<div className="t1">Add some artists</div>
							<ArtistSelect getArtists={setGetArtists} />
						</GridItem>
					</InnerGrid>
					<div className="titleSeparator"></div>
					<GridItem className="posMods">
						why not add some
						<PositiveModifers getPosMod={setGetPosMod} />
					</GridItem>
					<div className="titleSeparator"></div>

					<GridItem>
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
					</GridItem>
					<GridItem style={{ visibility: "hidden" }}>
						how about some
						<NegModifers getNegMod={setGetNegMod} />
					</GridItem>
				</GridContainer>
			</body>
		</Fragment>
	);
}

export default App;
