import { useEffect, useState } from "react";
import { OpenAIApi } from "openai";
import oaiConfig from "./OpenAIConfig";
import TextField from "./TextField";
import styled from "styled-components";
import { Button } from "./styled/ButtonStyle";
import ToggleButton from "./ToggleButton";

const Div = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

interface modelSelect {
	label: string;
	id: string;
}

function WrittenPrompt({ getGenPrompt, apiKey, settings }: any) {
	const [prompt, setPrompt] = useState("");
	const [genprompt, setgenPrompt] = useState<Array<string>>([]);
	const [useAi, setUseAi] = useState(false);
	// const [models, setModels] = useState<modelSelect>({
	// 	label: "",
	// 	id: "",
	// });
	// const [temperature, setTemperature] = useState<number | undefined>(0.5);
	// const [queryLength, setqueryLength] = useState<number | undefined>(24);

	const handleChange = () => {
		setUseAi(!useAi);
	};

	async function generateAiPrompt(prompt: string) {
		const openai = new OpenAIApi(oaiConfig(apiKey));
		const response: any = await openai.createCompletion({
			model: `${settings.models}`,
			prompt: `${prompt}`,
			max_tokens: settings.tokenlength,
			temperature: settings.temperature,
		});
		if (response === undefined) {
			return console.log("Check if API is correct.");
		} else {
			//strip output of any generated punctuation
			const outputText = response.data.choices[0].text.replace(
				/[^\w\s]/g,
				""
			);
			console.log(outputText);
			console.log(response.data);
			return setgenPrompt(outputText);
		}
	}

	useEffect(() => {
		getGenPrompt(genprompt);
	}, [genprompt, setgenPrompt, getGenPrompt]);

	return (
		<>
			<Div>
				<TextField
					value={prompt}
					onChange={setPrompt}
					placeholder={
						!useAi
							? "Describe your prompt"
							: "Set the scene for GPT description"
					}
				/>
				<ToggleButton checked={useAi} setChecked={handleChange} />
				<Button
					onClick={() => {
						if (useAi === true) {
							generateAiPrompt(prompt);
						}
						setgenPrompt([prompt]);
					}}
				>
					<p>Submit</p>
				</Button>
			</Div>
		</>
	);
}

export default WrittenPrompt;
