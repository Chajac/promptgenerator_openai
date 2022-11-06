import React, { Fragment, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import TextField from "./components/TextField";
import ArtistData from "./components/ArtistData";
import NegModifers from "./components/NegativeModifers";
import PositiveModifers from "./components/PositiveModifiers";
import StyleModifiers from "./components/StyleModifers";
import RangeSlider from "./components/RangeSlider";
import { Configuration, OpenAIApi } from "openai";
import oaiConfig from "./components/OpenAIConfig";
import createPrompt from "./components/StringCreation";
import GlobalStyle from "./components/styled/Theme";
import { Button } from "./components/styled/ButtonStyle";
import { Flex } from "./components/styled/Flex";
import { Grid } from "./components/styled/Grid";
import OpenAiGen from "./components/OpenAiGen";

//regex to match string every string before a comma /([a-z A-Z À-ÿ0-9'])+/g

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

  async function generatePrompt(prompt: string) {
    const openai = new OpenAIApi(oaiConfig);
    const response: any = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `${prompt}`,
      max_tokens: 24,
      temperature: 0.4,
    });
    if (response === undefined) {
      console.log("nothing");
    } else {
      return setgenPrompt(response.data.choices[0].text);
    }
  }
  // createPrompt(
  //   getStyle,
  //   genprompt,
  //   getArtists,
  //   getPosMod,
  //   getNegMod
  //   // promptWeight,
  //   // posmodWeight,
  //   // negmodWeight
  // );
  return (
    <Fragment>
      <GlobalStyle />
      <body>
        <Grid>
          <OpenAiGen getGenPrompt={setgenPrompt} oAIConfig={oaiConfig} />
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
          <div>
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
          </div>

          <p>
            {" "}
            prompt is:
            {createPrompt(
              getStyle,
              genprompt,
              getArtists,
              getPosMod,
              getNegMod
              // promptWeight,
              // posmodWeight,
              // negmodWeight
            )}
          </p>
          <p>{getStyle}</p>
          <ArtistData getArtists={setGetArtists} />
          <StyleModifiers getStyle={setgetStyle} />
          <NegModifers getNegMod={setGetNegMod} />
          <PositiveModifers getPosMod={setGetPosMod} />
        </Grid>
      </body>
    </Fragment>
  );
}

export default App;
