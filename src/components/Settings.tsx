import { OpenAIApi } from "openai";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { DragSingleSelect } from "./MultiSelect";
import oaiConfig from "./OpenAIConfig";
import RangeSlider from "./RangeSlider";
import { Button } from "./styled/ButtonStyle";
import OpenAISettings from "./OpenAISettings";

interface Props {
	apiKey?: string;
	setApiKey: (key: string) => void;
	setSettings: any;
	openAISettings?: {
		temperature: number;
		tokens: number;
		model: string;
	};
}
interface Models {
	label: string;
	id: string;
}
interface styledProps {
	textSecurity?: string;
}

const Div = styled.div`
	position: fixed;
	width: 20%;
	top: 0;
	right: 0;
	padding: 1rem;
	background-color: white;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
	z-index: 9999;
`;
const Button2 = styled.button`
	position: fixed;
	top: 0.25rem;
	right: 0.4rem;
	padding: 12px 20px;
	background-color: #5c5252;
	color: white;
	border: none;
	border-radius: 2px;
	font-size: 24px;
	cursor: pointer;
	transform: rotate(90deg);
`;

const Input = styled.input<styledProps>`
	font-family: "bulletfont";
	-webkit-text-security: ${(props) => props.textSecurity};
`;

const Settings: React.FC<Props> = ({ setApiKey, setSettings }) => {
	const [showModal, setShowModal] = useState(false);
	const [newApiKey, setNewApiKey] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmExpose, setConfirmExpose] = useState(false);
	const [models, setModels] = useState<Models>({
		label: "",
		id: "",
	});
	const [modelList, setModelList] = useState<
		{ label?: string; value?: string }[]
	>([]);
	const [temperature, setTemperature] = useState(0.5);
	const [tokenlength, setTokenlength] = useState(25);

	const settingsValues1 = useMemo(
		() => ({
			models: models.label ? models.label : "no model loaded",
			temperature: temperature,
			tokenlength: tokenlength,
		}),
		[models, temperature, tokenlength]
	);

	async function getModels(apiKey: string) {
		try {
			const openai = new OpenAIApi(oaiConfig(apiKey));
			const response = await openai.listModels();
			const updatedList =
				response.data?.data
					?.filter((i) => i.owned_by === "openai")
					.map((i) => ({ value: i.id, label: i.id })) ?? [];
			setModelList(updatedList);
		} catch (error: any) {
			if (error.response.status === 401) {
				console.log("Unauthorized or invalid API key");
			} else {
				console.log("Error: ", error.message);
			}
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await setApiKey(newApiKey);
		getModels(newApiKey);
	};

	const togglePasswordVisbility = () => {
		if (
			confirmExpose ||
			window.confirm("Are you sure you want to expose your API key?")
		) {
			setShowPassword(!showPassword);
			setConfirmExpose(true);
		}
	};
	useEffect(() => {
		setSettings(settingsValues1);
	}, [settingsValues1, setSettings]);

	return (
		<>
			<Button2 onClick={() => setShowModal(true)}>⚙️</Button2>
			{showModal && (
				<Div>
					<h2>Settings</h2>

					<form onSubmit={handleSubmit}>
						<label>
							API Key:
							<Input
								type={"text"}
								placeholder="chatGPT API key here"
								value={newApiKey}
								style={
									showPassword
										? ({
												WebkitTextSecurity: "none",
										  } as React.CSSProperties)
										: ({
												WebkitTextSecurity: "disc",
										  } as React.CSSProperties)
								}
								onChange={(event: any) =>
									setNewApiKey(event.target.value)
								}
							/>
						</label>
						<input
							style={{
								position: "relative",
								left: "-25px",
								top: "2px",
							}}
							type="checkbox"
							checked={showPassword}
							onChange={togglePasswordVisbility}
							autoComplete="new-password"
						></input>
						<Button
							background={"#272727"}
							color={"white"}
							padding={"5px 10px 5px 10px"}
							type="submit"
						>
							Apply
						</Button>
					</form>
					<h2>openAI model</h2>
					<DragSingleSelect
						placeholder={"Set API key to pull models"}
						options={modelList}
						getList={setModels}
					/>
					<h3>Temperature</h3>
					<RangeSlider
						min={0}
						max={1}
						step={0.1}
						value={temperature}
						onChange={setTemperature}
					/>
					<input
						type="number"
						value={temperature}
						min={0}
						max={1}
						step={0.1}
						onChange={(e) =>
							setTemperature(parseFloat(e.target.value))
						}
					></input>
					<h3>Token Length</h3>
					<RangeSlider
						min={0}
						max={100}
						step={1}
						value={tokenlength}
						onChange={setTokenlength}
					/>
					<input
						type="number"
						min={0}
						max={100}
						step={1}
						value={tokenlength}
						onChange={(e) => setTokenlength(Number(e.target.value))}
					></input>
					<div>
						<Button
							background={"#272727"}
							color={"white"}
							padding={"5px 10px 5px 10px"}
							onClick={() => setShowModal(false)}
						>
							Close
						</Button>
					</div>
				</Div>
			)}
		</>
	);
};

export default Settings;
