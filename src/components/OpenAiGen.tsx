import React, { useEffect, useState } from "react";
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { Button } from "./styled/ButtonStyle";
import TextField from "./TextField";
import RangeSlider from "./RangeSlider";
import TabContainer from "./TabContainer";
import { DragSingleSelect } from "./MultiSelect";

/* const oaiConfig = new Configuration({
  organization: "org-vV3sYibXFeOTvkmc2Br9Ik7p",
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
}); */

interface modelSelect {
  label: string;
  id: string;
}

function OpenAiGen({ getGenPrompt, oAIConfig }: any) {
  const [prompt, setPrompt] = useState("");
  const [genprompt, setgenPrompt] = useState<Array<string>>([]);
  const [models, setModels] = useState<modelSelect>({
    label: "",
    id: "",
  });
  const [temperature, setTemperature] = useState<number | undefined>(0.5);
  const [queryLength, setqueryLength] = useState<number | undefined>(24);

  useEffect(() => {
    getGenPrompt(genprompt);
  }, [genprompt, setgenPrompt, getGenPrompt]);

  async function generateNonAiPrompt(prompt: string) {}

  async function generateAiPrompt(prompt: string) {
    const openai = new OpenAIApi(oAIConfig);
    const response: any = await openai.createCompletion({
      model: `${models?.label}`,
      prompt: `${prompt}`,
      max_tokens: 30,
      temperature: 0.5,
    });
    if (response === undefined) {
      return;
    } else {
      console.log(response.data.choices[0].text);
      return setgenPrompt(response.data.choices[0].text);
    }
  }
  //console.log(models);

  const modelList: { label?: string; value?: string }[] = [];

  async function getModels() {
    const openai = new OpenAIApi(oAIConfig);
    const response = await openai.listModels();
    response.data?.data?.forEach((i) => {
      if (i.owned_by === "openai") {
        modelList.push({ value: i.id, label: i.id });
      }
    });
    return;
  }
  getModels();
  return (
    <div>
      <TabContainer
        tabTitle1="Text Prompt"
        textGen={
          <>
            <TextField
              value={prompt}
              onChange={setPrompt}
              placeholder="Prompt input"
            />
            <Button onClick={() => setgenPrompt([prompt])}>Text Input</Button>
          </>
        }
        tabTitle2="Ai Prompt"
        aiGen={
          <>
            <TextField
              value={prompt}
              onChange={setPrompt}
              placeholder="Prompt input"
            />
            <Button onClick={() => generateAiPrompt(prompt)}>
              AI prompt generation
            </Button>
          </>
        }
        tabTitle3="AI Settings"
        aiSettings={
          <>
            <DragSingleSelect options={modelList} getList={setModels} />
            <RangeSlider
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
          </>
        }
      />
    </div>
  );
}

export default OpenAiGen;
